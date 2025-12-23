const snowContainer = document.getElementById('snow-container');
const numberOfFlakes = 10; 

for (let i = 0; i < numberOfFlakes; i++) {
  const flake = document.createElement('div');
  flake.classList.add('snowflake');
  flake.style.left = Math.random() * 100 + 'vw'; 
  flake.style.fontSize = Math.random() * 20 + 20 + 'px'; // random size
  flake.style.animationDuration = Math.random() * 5 + 15 + 's'; // random speed
  flake.style.opacity = Math.random() * 0.5 + 0.5; // random opacity
  const snowChars = ['❄','❅','❆','✻','✼','✽','❉','✿'];
flake.textContent = snowChars[Math.floor(Math.random() * snowChars.length)];
  snowContainer.appendChild(flake);
}

