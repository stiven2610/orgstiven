import "./Footer.css"

const Footer = () => {
    return <footer className='footer' style={{ backgroundImage: "url(/img/footer.png)" }}>
        <div className='redes'>
            <a href='#'>
                <img src="/img/facebook.png" alt='Facebook' />
            </a>
            <a href='#'>
                <img src="/img/twitter.png" alt='twitter' />
            </a>
            <a href='#'>
                <img src="/img/instagram.png" alt='instagram' />
            </a>
        </div>
        <img src='/img/Logo.png' alt='org' />
    </footer>
}

export default Footer