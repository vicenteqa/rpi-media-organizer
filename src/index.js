const fs = require("fs");
const fse = require("fs-extra");
const glob = require("glob");
const schedule = require("node-schedule");

const TORRENT_FOLDER_PATH = "../storage/torrent/completed/";
const MEDIA_FOLDER_PATH = "../storage/media/";

function moveTorrentsToMedia() {
  console.log("Organizing media");

  const torrentFoldersContent = fs.readdirSync(TORRENT_FOLDER_PATH);

  console.log(torrentFoldersContent);

  return torrentFoldersContent.map((folder) => {
    if (isVideoFile(folder)) moveMovieInsideTorrentFolder(folder);
    else {
      const videoFilesInFolderAmount = countVideoFilesInFolder(folder);
      const folderMediaType = getFolderMediaType(videoFilesInFolderAmount);

      if (folderMediaType === "movie") moveMovieInsideFolder(folder);
      else if (folderMediaType === "tv") moveTvShow(folder);
    }
  });
}

function moveMovieInsideTorrentFolder(movieFile) {
  const sourceMoviePath = TORRENT_FOLDER_PATH + movieFile;
  const destinationMoviePath = MEDIA_FOLDER_PATH + "movies/" + movieFile;
  fs.renameSync(sourceMoviePath, destinationMoviePath);
  return console.log(sourceMoviePath + " => " + destinationMoviePath);
}

function moveMovieInsideFolder(folder) {
  const movieFile = getMovieFile(folder);
  const sourceMoviePath = TORRENT_FOLDER_PATH + folder + "/" + movieFile;
  const destinationMoviePath = MEDIA_FOLDER_PATH + "movies/" + movieFile;
  fs.renameSync(sourceMoviePath, destinationMoviePath);
  console.log(sourceMoviePath + " => " + destinationMoviePath);
  return fse.rmdirSync(TORRENT_FOLDER_PATH + folder);
}

function moveTvShow(folder) {
  const sourceTvPath = TORRENT_FOLDER_PATH + folder + "/";
  const destinationTvPath = MEDIA_FOLDER_PATH + "tv/" + folder + "/";
  fse.renameSync(sourceTvPath, destinationTvPath);
  return console.log(sourceTvPath + " => " + destinationTvPath);
}

function getMovieFile(folder) {
  const folderFiles = fs.readdirSync(TORRENT_FOLDER_PATH + folder);
  const indexOfMovieFile = folderFiles
    .map((file) => isVideoFile(file))
    .indexOf(true);
  return folderFiles[indexOfMovieFile];
}

function countVideoFilesInFolder(folder) {
  const contentPath = TORRENT_FOLDER_PATH + folder + "/**/*";
  const files = glob.sync(contentPath);

  const amountOfVideoFilesInFolder = files
    .map((file) => isVideoFile(file))
    .filter((value) => value === true).length;
  return amountOfVideoFilesInFolder;
}

function getFolderMediaType(amountOfVideoFilesInFolder) {
  if (amountOfVideoFilesInFolder > 1) return "tv";
  else if (amountOfVideoFilesInFolder === 1) return "movie";
  else return "other";
}

function isVideoFile(file) {
  return (
    file.includes("mp4") === true ||
    file.includes("avi") === true ||
    file.includes("mkv") == true
  );
}

schedule.scheduleJob("*/10 * * * *", () => moveTorrentsToMedia());
