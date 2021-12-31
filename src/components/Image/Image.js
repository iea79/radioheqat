const Image = ({src, webp, ...props}) => {
    return (
            <picture {...props}>
                <source srcSet={ webp } type="image/webp" />
                <img src={ src } alt="" />
            </picture>
    )
}

export default Image;
