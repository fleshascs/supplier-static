// interface ImageProps extends Omit<React.HTMLProps<HTMLImageElement>, 'crossOrigin'> Required< {
interface ImageProps
  extends Required<Pick<React.HTMLProps<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'>>,
    Pick<React.HTMLProps<HTMLImageElement>, 'title' | 'className'> {
  src: string;
  webp: string;
}

export default function Image({ src, webp, ...rest }: ImageProps) {
  return (
    <picture {...rest}>
      {webp ? <source srcSet={webp} type='image/webp' /> : null}
      <img src={src} title={rest.title ?? rest.alt} {...rest} />
    </picture>
  );
}
