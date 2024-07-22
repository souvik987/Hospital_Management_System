import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <>
    <div className='container biography'>
        <div className="banner">
          <img src={imageUrl} alt="about image" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who we Are</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta aut ab quidem saepe cupiditate perspiciatis nemo? Voluptatum fugit provident dolor ipsum consequuntur quae neque architecto laborum. Est, fuga illum sequi saepe officiis dolor, eius iusto quasi modi eos architecto placeat? Magnam, dicta. Dolore quo corporis explicabo, dolorem porro numquam doloremque.
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe quidem nihil sint vel aperiam officiis blanditiis numquam minus, quisquam unde provident ducimus necessitatibus? Iure, minima perspiciatis. Deleniti, quis nam consequatur quia nulla id animi!</p>
        
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum necessitatibus soluta sunt.</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  </>
  )
}

export default Biography
