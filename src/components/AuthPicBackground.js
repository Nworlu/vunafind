import "./AuthPicBackground.css"

const AuthPicBackground = ({image,alt, text})=>{
    return  <div className="image-container">
      {/* <h1 className="contact-text">{text}</h1> */}
    <img src={image} alt={alt} />
  </div>
}

export default AuthPicBackground
