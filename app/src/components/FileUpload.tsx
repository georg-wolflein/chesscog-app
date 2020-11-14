import React from "react";
import "./FileUpload.css";
import classnames from "classnames";
import { getPrediction } from "../core/api";

interface FileUploadProps {
  onUpload?(file: File): void;
}
interface FileUploadState {
  dragging: boolean;
}

export default class FileUpload extends React.Component<
  FileUploadProps,
  FileUploadState
> {
  constructor(props: FileUploadProps) {
    super(props);
    this.state = { dragging: false };
  }

  preventDefault: React.EventHandler<React.SyntheticEvent<Element>> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  startDragging: React.DragEventHandler<Element> = (e) => {
    this.preventDefault(e);
    this.setState({ dragging: true });
  };

  stopDragging: React.DragEventHandler<Element> = (e) => {
    this.preventDefault(e);
    this.setState({ dragging: false });
  };

  drop: React.DragEventHandler<Element> = (e) => {
    this.stopDragging(e);
    const file = e.dataTransfer.files[0];
    if (this.props.onUpload) this.props.onUpload(file);
  };

  changeFile: React.ChangeEventHandler<Element> = (e) => {
    this.preventDefault(e);
    const target: any = e.target;
    if (this.props.onUpload) this.props.onUpload(target.files[0]);
  };

  render() {
    return (
      <div
        className={classnames("FileUpload", {
          "is-dragover": this.state.dragging,
        })}
        onDragOver={this.startDragging.bind(this)}
        onDragEnter={this.startDragging.bind(this)}
        onDragEnd={this.startDragging.bind(this)}
        onDragLeave={this.startDragging.bind(this)}
        onDrop={this.drop.bind(this)}
      >
        <div className="FileUpload-upload">
          <div className="FileUpload-input">
            <input
              className="FileUpload-file"
              type="file"
              name="file"
              id="file"
              onChange={this.changeFile.bind(this)}
            />
            <label htmlFor="file">
              <b>Choose a file</b>
              <span className="FileUpload-dragndrop"> or drag it here</span>.
            </label>
          </div>
          <div className="FileUpload-uploading">Uploading…</div>
          <div className="FileUpload-success">Done!</div>
          <div className="FileUpload-error">
            Error! <span></span>.
          </div>
        </div>
      </div>
    );
  }
}
