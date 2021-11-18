const fs = require("fs");
const appRootPath = require("app-root-path");

// File format : <FileName>-<Version>.<Extension>
exports.downloadLibraryEncoder=(req,res,next)=>{
    const { platform, version } = req.query;
    const NODE_ENV=process.env.NODE_ENV || "development"
    var targetDirectory = `${appRootPath.toString()}/desktopbuilds/${NODE_ENV}`
    var filePath = "";
    switch (platform) {
      case "win":
      case "window":
        // const fileNameWhileDownload="SonicLibraryEncoder.exe"
        if (version && version != "latest") {
          filePath = `${targetDirectory}/window/SonicLibraryEncoder-${version}.exe`;
        } else if (version && version == "latest") {
          const latestVersionDir = `${targetDirectory}/window/latest_version`;
          const files = fs
            .readdirSync(latestVersionDir)
            .filter((file) => file.includes(".exe"));
          filePath = `${targetDirectory}/window/latest_version/${
            files[0]
          }`;
        } else {
          const latestVersionDir = `${targetDirectory}/window/latest_version`;
          const files = fs
            .readdirSync(latestVersionDir)
            .filter((file) => file.includes(".exe"));
          filePath = `${targetDirectory}/window/latest_version/${
            files[0]
          }`;
        }
        break;
  
      case "osx":
      case "mac":
        // const fileNameWhileDownload="SonicLibraryEncoder.dmg"
        if (version && version != "latest") {
          filePath = `${targetDirectory}/mac/SonicLibraryEncoder-${version}.dmg`;
        } else if (version && version == "latest") {
          const latestVersionDirWin = `${targetDirectory}/mac/latest_version`;
          const files = fs
            .readdirSync(latestVersionDirWin)
            .filter((file) => file.includes(".dmg"));
          filePath = `${targetDirectory}/mac/latest_version/${
            files[0]
          }`;
        } else {
          const latestVersionDirMac = `${targetDirectory}/mac/latest_version`;
          const files = fs
            .readdirSync(latestVersionDirMac)
            .filter((file) => file.includes(".dmg"));
          filePath = `${targetDirectory}/mac/latest_version/${
            files[0]
          }`;
        }
        break;
  
      default:
        return res
          .status(422)
          .send(
            "Please provide one of the platform eg: ?platform=win OR ?platform=osx to download"
          );
    }
  
    return res.download(filePath, function (err) {
      if (err) {
        console.log(err);
        return res.status(422).send(`Unable to download: ${err?.message} `);
      }
    });
}

exports.getLibraryEncoderVersionHistory=(req,res,next)=>{
    const { platform } = req.query;
    const NODE_ENV=process.env.NODE_ENV || "development"
    var targetDirectory = `${appRootPath.toString()}/desktopbuilds/${NODE_ENV}`
    var versionHistories = {};
    switch (platform) {
      case "win":
      case "window":
        var latestVersionDirWin = `${targetDirectory}/window/latest_version`;
        var versionsDirWin = `${targetDirectory}/window/`;
        var versions = fs
          .readdirSync(versionsDirWin)
          .filter((file) => file.includes(".exe"));
        var latestVersion = fs
          .readdirSync(latestVersionDirWin)
          .filter((file) => file.includes(".exe"))[0];
        versions.forEach((ver) => {
          const versionName = ver
            ?.split?.("-")?.[1]
          versionHistories[versionName] = ver;
        });
        versionHistories["latest"] = latestVersion;
        break;
  
      case "osx":
      case "mac":
        var latestVersionDirMac = `${targetDirectory}/mac/latest_version`;
        var versionsDirMac = `${targetDirectory}/mac/`;
        var versions = fs
          .readdirSync(versionsDirMac)
          .filter((file) => file.includes(".dmg"));
        var latestVersion = fs
          .readdirSync(latestVersionDirMac)
          .filter((file) => file.includes(".dmg"))[0];
        versions.forEach((ver) => {
          var versionName = ver?.split?.("-")?.[1];
          versionHistories[versionName] = ver;
        });
        versionHistories["latest"] = latestVersion;
  
        break;
  
      default:
        return res
          .status(422)
          .send(
            "Please provide one of the platform eg: ?platform=win OR ?platform=osx to download"
          );
    }
  
    res.send(versionHistories);
}