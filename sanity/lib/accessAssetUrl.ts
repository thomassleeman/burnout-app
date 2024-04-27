import { projectId, dataset } from "@/sanity/env";

const accessAssetUrl = (audio) => {
  const assetRefParts = audio.asset._ref.split("-"); //[file/image, reference, fileType]
  const id = assetRefParts[1];
  const format = assetRefParts[2];
  const assetUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${format}`;
  return assetUrl;
};

export default accessAssetUrl;
