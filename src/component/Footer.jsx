import React from 'react';
import styled from 'styled-components';

function Footer() {
    return (
        <FooterWrapper>
            <div className='footer'>
                <div className='footerWrap'>
                    <div className='footerTTL'>OUR COMPANY</div>
                    <ul className='footerTXT'>
                        <li>About Us</li>
                        <li>Press</li>
                        <li>Careers</li>
                        <li>Investors</li>
                        <li>Reviews</li>
                    </ul>
                </div>
                <div className='footerWrap'>
                    <div className='footerTTL'>CUSTOMER SUPPORT</div>
                    <ul className='footerTXT'>
                        <li>Get Help</li>
                        <li>Visit Support Center</li>
                        <li>1stDibs Promise</li>
                    </ul>
                </div>
                <div className='footerWrap'>
                    <div className='footerTTL'>CONNECT WITH US</div>
                    <ul className='footerTXT'>
                        <li>Sign up for weekly emails with new listings, sales and more!</li>
                        <li>Visit Support Center</li>
                        <li>1stDibs Promise</li>
                    </ul>
                </div>
            </div>

        </FooterWrapper>
    );
}

const FooterWrapper = styled.div`
    width: 100%;
    padding: 70px 0;
    border-top: 1px solid #333333;
    .footer{
        max-width: 1280px;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        .footerWrap{
            max-width: 400px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 40px;
            text-align: left;
            .footerTTL{
                font-weight: 700;
            }
            .footerTXT{
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
        }

    }
`

export default Footer;