import { Biohazard, Box, File, FlaskConical, Folders } from "lucide-react";
import React from "react";

function LucideIcons({ iconName, ...props }) {
  return iconName === "Folders" ? (
    <Folders {...props} />
  ) : iconName === "Entry" ? (
    <File {...props} />
  ) : iconName === "Biohazard" ? (
    <Biohazard {...props} />
  ) : (
    iconName === "Sample" && <FlaskConical {...props} />
  );
}

export default LucideIcons;
