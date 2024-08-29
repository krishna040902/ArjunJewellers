document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.card button');

  //Review..
  const checkoutButton = document.getElementById('checkoutbtn');
  const totalPriceElement = document.getElementById('totalprice');

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
        const response = await fetch('/removefromcart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ item })
        });

        // const result = await response.json();
        // if (response.ok) {
        //   alert(result.message);
        // } else {
        //   alert(result.message);
        // }
        if (response.ok) {
          const result = await response.json();
          alert(result.message);
          // Reload the page to reflect the updated cart
          window.location.href = '/cart';
        } else {
          const result = await response.json();
          alert(result.message);
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
        alert('Error in removing item');
      }
    });
  });

  checkoutButton.addEventListener('click', async () => {
    window.location.href = '/checkout';
  });

  // // There is no need of this post request, because we're not performing anything in the database.
  // checkoutButton.addEventListener('click', async () => {
  //   const totalPrice = totalPriceElement.textContent.split(': Rs. ')[1];

  //   try {
  //     const response = await fetch('/checkout', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ totalprice: totalPrice })
  //     });

  //     if (response.ok) {
  //       window.location.href = '/checkout'; // Redirect to order confirmation page
  //     } else {
  //       const result = await response.json();
  //       alert(result.message);
  //     }
  //   } catch (error) {
  //     console.error('Error during checkout:', error);
  //     alert('Error in processing checkout');
  //   }
  // });
});