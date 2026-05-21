function TextExpander({children, maxLength}) {
    return (
        
            <p>{children.length > maxLength ? children.substring(0, maxLength) + '...' : children}</p>
        
    );
}
export default TextExpander;