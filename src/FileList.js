import React from "react";

export default props => {
  const { filesList, removeFile } = props;
  return (
    <>
      <div className="fileList">
        <table className="highlight centered">
          <thead>
            <tr>
              <th colSpan="3">
                <h5>File Names</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {filesList.length
              ? filesList.map(f => (
                  <tr key={f.name}>
                    <td>
                      <img src={f.src} className={f.className} />
                    </td>
                    <td>
                      {f.name}
                      <a
                        href="#!"
                        className="secondary-content"
                        onClick={() => removeFile(f.name)}
                      >
                        <i className="material-icons">delete</i>
                      </a>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};
