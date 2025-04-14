import React from 'react';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import './about.css'

const AboutPage = () => {
  return (
    <div>
      <h2>About Us</h2>
      <p>
        Our software development service is your strategic partner in turning ideas into powerful digital solutions.
        Or in  designing and building software that facilitates efficient and well organised way to run your business, we've got you covered.
        Whether you're looking for desktop software, or web-based solutions we will help you find solution.
      </p>
      <br/>
      <p>
        <span style={{marginBottom: '2px'}}>For support and More Information please contact us on <br/></span>
        <div className="navigation">
          <div className={'center'}>
            <div className={'child'}>
              <LocalPhoneOutlinedIcon />
              <a href="tel:+251924385314">+251 92 438 5314</a><br/>
            </div>
            <div className={'child'}>
              <LocalPhoneOutlinedIcon />
              <a href="tel:+251939881843">+251 93 988 1843</a><br/>
            </div>
            <div className={'child'}>
              <EmailOutlinedIcon />
              <a href="mailto:phindertech@gmail.com">phindertech@gmail.com</a><br/>
            </div>
          </div>
        </div>
      </p>
    </div>
  );
};

export default AboutPage;
