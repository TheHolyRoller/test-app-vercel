/* eslint-disable @next/next/no-img-element */

import '../Styles/card.css'; 


export default function Card() { 




    return(
        <>
            <ul id="cards">
      <li class="card" id="card-1">
        <div class="card-content">
          <div>
            <h2>Card One</h2>
            <p>This is the content of card one. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <figure>
            <img src="https://assets.codepen.io/210284/flower-9.jpg" alt="card-one"/>
          </figure>
        </div>
      </li>

      <li class="card" id="card-2">
        <div class="card-content">
          <div>
            <h2>Card Two</h2>
            <p>This is the content of card two. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <figure>
            <img src="https://assets.codepen.io/210284/flower-8.jpg" alt="card two"/>
          </figure>
        </div>
      </li>

      <li class="card" id="card-3">
        <div class="card-content">
          <div>
            <h2>Card Three</h2>
            <p>This is the content of card three. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <figure>
            <img src="https://assets.codepen.io/210284/flower-7.jpg" alt="card three"/>
          </figure>
        </div>
      </li>

      <li class="card" id="card-4">
        <div class="card-content">
          <div>
            <h2>Card Four</h2>
            <p>This is the content of card four. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <figure>
            <img src="https://assets.codepen.io/210284/flower-6.jpg" alt="card four"/>
          </figure>
        </div>
      </li>
    </ul>
        </>
    )


}