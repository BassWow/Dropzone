import React, { useState, useEffect } from "react";

import FileList from "./FileList";

export default () => {
  document.body.ondragover = document.body.ondragenter = document.body.ondrop = function(
    e
  ) {
    e.preventDefault();
  };

  const [userState, setUsername] = useState({ username: "" });
  const [countState, setCount] = useState(0);
  const [filesState, setFiles] = useState({ filesList: [] });
  const [apiState, setApi] = useState("");
  const [progressState, setProgress] = useState({
    progress: 0,
    loading: false
  });

  const dropZoneDragOver = e => {
    e.stopPropagation();
    e.preventDefault();
    e.target.classList.add("highlite");

    e.dataTransfer.dropEffect = "copy";
  };
  const dropZoneLeave = e => {
    e.target.classList.remove("highlite");
  };

  const dropZoneDrop = e => {
    e.stopPropagation();
    e.preventDefault();
    e.target.classList.remove("highlite");
    handleFiles(e);
  };

  const handleFiles = e => {
    e.stopPropagation();
    e.preventDefault();

    // reset state for filesList
    setCount(0);
    setFiles({ filesList: [] });
    const files = [...(e.target.files || e.dataTransfer.files)].filter(f =>
      /image\/jpeg/.test(f.type.toString())
    );

    files.length &&
      files.map(f => {
        // increment counter

        setCount(countState + 1);
        const reader = new FileReader();
        reader.onload = e => {
          setFiles(prevState => ({
            filesList: [
              ...prevState.filesList,
              {
                className: "myimage",
                name: f.name,
                value: e.target.result,
                src: e.target.result
              }
            ]
          }));
          //img.src = e.target.result;
        };
        reader.readAsDataURL(f);
      });
  };

  const removeFile = n => {
    setFiles(prevState => ({
      filesList: [...prevState.filesList.filter(f => f.name !== n)]
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    //var progressBar = document.querySelector(".determinate");
    xhr.open("POST", "https://reqres.in/api/users", true);

    xhr.onload = () => {
      setApi(xhr.responseText);
      setProgress(prevState => ({ progress: 0, loading: false }));
      setFiles(prevState => ({ filesList: [] }));
    };

    xhr.onerror = function(e) {
      setApi("AN ERROR OCCURRED");
    };

    // Listen to the upload progress.

    xhr.upload.onprogress = e => {
      if (e.lengthComputable) {
        setProgress(prevState => ({
          progress: (e.loaded / e.total) * 100,
          loading: true
        }));
      }
    };

    if (filesState.filesList.length === 0) {
      xhr.send(formData);
    } else if (filesState.filesList.length) {
      filesState.filesList.forEach(file => {
        formData.append(file.name, file.value);
      });
      xhr.send(formData);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col s12">
            {progressState.loading ? (
              <div className="progress">
                <div
                  className="determinate"
                  style={{ width: progressState.progress + "%" }}
                />
              </div>
            ) : null}
            <form id="myform" onSubmit={handleSubmit}>
              <div className="input-field">
                <input
                  type="text"
                  value={userState.username}
                  onChange={e => setUsername({ username: e.target.value })}
                />
              </div>
              <div className="file-field input-field">
                <div className="btn-large">
                  <span>Files</span>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg"
                    onChange={e => handleFiles(e)}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input
                    className="file-path validate"
                    type="text"
                    placeholder="Upload one or more files"
                  />
                </div>
              </div>

              <input type="submit" className="btn-large" />
            </form>
            <div className="container">
              <div className="row">
                <div className="col s12">
                  <div
                    className="dropzone z-depth-3"
                    onDragEnter={e => dropZoneDragOver(e)}
                    onDragOver={e => dropZoneDragOver(e)}
                    onDragLeave={e => dropZoneLeave(e)}
                    onDrop={e => dropZoneDrop(e)}
                  >
                    <span>Drop files here</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="result">
              {apiState.length ? (
                <strong style={{ color: "red" }}>{apiState}</strong>
              ) : null}
            </div>

            <div className="container">
              <div className="row">
                <div className="col s12">
                  {filesState.filesList.length ? (
                    <FileList
                      filesList={filesState.filesList}
                      removeFile={removeFile}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
