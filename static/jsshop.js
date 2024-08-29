document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.card button');

  addToCartButtons.forEach(button => {
    button.addEventListener('mousedown', (event) => {
      event.target.classList.add('darkened');
    });

    button.addEventListener('mouseup', (event) => {
      event.target.classList.remove('darkened');
    });

    button.addEventListener('mouseleave', (event) => {
      event.target.classList.remove('darkened');
    });
    button.addEventListener('click', async (event) => {
      const card = event.target.closest('.card');
      const item = {
        number: card.querySelector('p:nth-of-type(1)').textContent.split(': ')[1],
        weight: card.querySelector('p:nth-of-type(2)').textContent.split(': ')[1],
        price: card.querySelector('p:nth-of-type(3)').textContent.split(': ')[1],
        image_address: card.querySelector('img').src.slice(16)
      };

      try {
        const response = await fetch('/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ item })
        });

        const result = await response.json();
        if (response.ok) {
          alert(result.message);
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Error adding to cart');
      }
    });
  });
});
