import React from "react";

interface ImagePreviewProps {
  file: File;
  corners?: Array<Array<number>>;
  width: number;
}
interface ImagePreviewState {}

export default class ImagePreview extends React.Component<
  ImagePreviewProps,
  ImagePreviewState
> {
  private canvasRef = React.createRef<HTMLCanvasElement>();

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const img = new Image();
    const objectUrl = URL.createObjectURL(this.props.file);
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    img.onload = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const scale = canvas.width / img.width;
      canvas.height = img.height * scale;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const corners = this.props.corners?.map((points) =>
        points.map((coord) => coord * scale)
      );
      if (!corners) return;
      let i = 0;
      for (let [x, y] of corners) {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        i += 1;
      }
      let [x, y] = corners[0];
      ctx.lineTo(x, y);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#f0d9b5";
      ctx.stroke();
    };
    img.src = objectUrl;
  }

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        width={this.props.width}
        style={{ borderRadius: "10px" }}
      />
    );
  }
}
