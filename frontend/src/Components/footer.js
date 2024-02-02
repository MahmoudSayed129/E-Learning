import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import img from './logo.png';
export default function App() {
  return (
    <div id='footer' className='mt-5'>
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='twitter' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='google' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
              <img id="img" src={img} className="mx-2" />
             
              </h6>
           
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 style={{ color: '#a00407'}} className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' style={{ color: '#a00407',textDecoration: 'none'}}>
                  Angular
                </a>
              </p>
              <p>
                <a href='#!'style={{ color: '#a00407',textDecoration: 'none'}}>
                  React
                </a>
              </p>
              <p>
                <a href='#!' style={{ color: '#a00407',textDecoration: 'none'}}>
                  Vue
                </a>
              </p>
              <p>
                <a href='#!' style={{ color: '#a00407',textDecoration: 'none'}}>
                  Laravel
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 style={{ color: '#a00407'}} className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' style={{ color: '#a00407',textDecoration: 'none'}} >
                 Pricing
                </a>
              </p>
              <p>
                <a href='#!' style={{ color: '#a00407',textDecoration: 'none'}}>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' style={{ color: '#a00407',textDecoration: 'none'}}>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' style={{ color: '#a00407',textDecoration: 'none'}}>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 style={{ color: '#a00407'}} className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p style={{ color: '#a00407'}}>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                Egypt
              </p>
              <p style={{ color: '#a00407'}}>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                info@cancham.org.eg
              </p>
              <p style={{ color: '#a00407'}}>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> +201001004070
              </p>
              <p style={{ color: '#a00407'}}>
                <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2022 Copyright : 
        <a style={{textDecoration: 'none'}} className='text-reset fw-bold' href=''>
              Canadian Chamber Of Commerce
        </a>
      </div>
    </MDBFooter>
    </div>
  );
}