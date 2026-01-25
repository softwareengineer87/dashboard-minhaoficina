
import './footer.css';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='footer-container'>
      <div className='footer'>
        <div className='footer-left'>
          <p>© {year} Fison Dashoard. All Rights Reserved. Made with love by Fison Engineer!</p>
        </div>
      </div>
    </footer>
  );
}

export { Footer }

