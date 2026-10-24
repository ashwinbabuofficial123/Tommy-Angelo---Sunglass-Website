import { useState } from "react";
import "../css/model3d.css";

const Model3D = () => {
  const [showModel, setShowModel] = useState(false);

  const modelUrl =
    "https://sketchfab.com/models/1afc16df397c40d8a0ff4b61c74ea652/embed?transparent=1&autostart=1&ui_infos=0&ui_stop=0" +
    "?autostart=1" +
    "&ui_infos=0" +
    "&ui_stop=0" +
    "&ui_inspector=0" +
    "&ui_help=0" +
    "&ui_settings=0" +
    "&ui_vr=0" +
    "&ui_fullscreen=0" +
    "&ui_annotations=0" +
    "&ui_watermark_link=0" +
    "&ui_hint=0";

  return (
    <div className="model-3d">
      {!showModel && (
        <div className="model-preview">
          <button className="view-360-btn" onClick={() => setShowModel(true)}>
            <span>↻</span>
            VIEW 360°
          </button>
        </div>
      )}

      {showModel && (
        <iframe
          title="Ray-Ban 3D Model"
          src={modelUrl}
          frameBorder="0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default Model3D;
