import {MediaFile} from '@shopify/hydrogen-react';
import {
  ExternalVideo,
  MediaImage,
  Model3d,
  Video,
} from '@shopify/hydrogen-react/dist/types/storefront-api-types';

type ProductGalleryProps = {
  medias: (ExternalVideo | MediaImage | Model3d | Video)[];
};

export function ProductGallery({medias}: ProductGalleryProps) {
  if (!medias.length) {
    return null;
  }

  return (
    <div
      className={`grid gap-4 overflow-x-scroll grid-flow-col md:grid-flow-row  md:p-0 md:overflow-x-auto md:grid-cols-2 w-[90vw] md:w-full lg:col-span-2`}
    >
      {medias.map(
        (med: ExternalVideo | MediaImage | Model3d | Video, i: number) => {
          let extraProps = {};

          if (med.mediaContentType === 'MODEL_3D') {
            extraProps = {
              interactionPromptThreshold: '0',
              ar: true,
              loading: 'eager',
              disableZoom: true,
              style: {height: '100%', margin: '0 auto'},
            };
          }

          return (
            <div
              className={`${
                i % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'
              } snap-center card-image bg-white aspect-square md:w-full w-[80vw] shadow-sm rounded`}
              key={'image' in med ? med.image?.id : med.id}
            >
              <MediaFile
                tabIndex={0}
                className={`w-full h-full aspect-square object-cover`}
                data={med}
                {...extraProps}
              />
            </div>
          );
        },
      )}
    </div>
  );
}
