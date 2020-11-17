import React from "react";
import "./FileUpload.scss";
import classnames from "classnames";

interface FileUploadProps {
  onUpload?(file: File): void;
}
interface FileUploadState {
  dragging: { [key: string]: boolean };
}

export default class FileUpload extends React.Component<
  FileUploadProps,
  FileUploadState
> {
  private dragListeners: { [key: string]: React.DragEventHandler<Element> };

  constructor(props: FileUploadProps) {
    super(props);
    this.state = { dragging: {} };
    this.startDragging.bind(this);
    this.stopDragging.bind(this);
    this.drop.bind(this);
    this.changeFile.bind(this);
    this.dragListeners = {
      onDragOver: this.startDragging,
      onDragEnter: this.startDragging,
      onDragEnd: this.stopDragging,
      onDragLeave: this.stopDragging,
      onDrop: this.drop,
    };
  }

  preventDefault: React.EventHandler<React.SyntheticEvent<Element>> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  startDragging: React.DragEventHandler<Element> = (e) => {
    this.preventDefault(e);
    this.setState(({ dragging }) => ({
      dragging: { ...dragging, [(e.target as Element).id]: true },
    }));
  };

  stopDragging: React.DragEventHandler<Element> = (e) => {
    this.preventDefault(e);
    const target = e.target as Element;
    this.setState(({ dragging }) => ({
      dragging: { ...dragging, [(e.target as Element).id]: false },
    }));
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
          "is-dragover": Object.values(this.state.dragging).some((x) => x),
        })}
        {...this.dragListeners}
        id="Fileupload"
      >
        <div
          className="FileUpload-upload"
          {...this.dragListeners}
          id="Fileupload-upload"
        >
          <div className="FileUpload-input">
            <input
              className="FileUpload-file"
              type="file"
              name="file"
              id="file"
              onChange={this.changeFile}
            />
            <label htmlFor="file">
              <b>Choose a file</b>
              <span className="FileUpload-dragndrop"> or drag it here</span>.
            </label>
          </div>
        </div>
      </div>
    );
  }
}
