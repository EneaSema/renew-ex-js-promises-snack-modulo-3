// 🏆 Snack 1
// Ottieni il titolo di un post con una Promise.

// Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise
// che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}

// function getPostTitle(id) {
//   return new Promise((resolve, reject) => {
//     fetch(`https://dummyjson.com/posts/${id}`)
//       .then((response) => response.json())
//       .then((post) => resolve(post.title))

//       .catch(reject);
//   });
// }
// getPostTitle(1)
//   .then((post) => console.log(`Il titolo del post è:`, post))
//   .catch((error) => console.error(error));

// 🎯 Bonus: Ottieni l'intero post con l'autore
// Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.

// function getPost(id) {
//   return new Promise((resolve, reject) => {
//     fetch(`https://dummyjson.com/posts/${id}`)
//       .then((response) => response.json())
//       .then((post) => {
//         fetch(`https://dummyjson.com/users/${post.userId}`)
//           .then((response) => response.json())
//           .then((user) => {
//             const result = {
//               ...post,
//               user,
//             };
//             resolve(result);
//           })
//           .catch(reject);
//       })
//       .catch(reject);
//   });
// }

// getPost(1)
//   .then((post) => console.log(`Il post con tutto è:`, post))
//   .catch((error) => console.error(error));

// 🏆 Snack 2
// Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.

// function lanciaDado() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const incastrato = Math.random() < 0.2;
//       if (incastrato) {
//          reject("Errore, daddo incastrato");
//
//       } else {
//         const valore = Math.floor(Math.random() * 6) + 1;
//         console.log(`Il valore è:`, valore);
//         resolve(valore);
//       }
//     }, 3000);
//   });
// }

// lanciaDado()
//   .then((valore) => console.log("Il valore ottenuto è:", valore))
//   .catch((error) => console.error(error));

// 🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
// Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!".

function creaLanciaDado() {
  console.log(`Sto lanciando il dado...`);
  let valoreIniziale = null;
  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const incastrato = Math.random() < 0.2;
        if (incastrato) {
          console.log("Errore, dado incastrato");
          valoreIniziale = null;
          reject("Errore, dado incastrato");
        } else {
          const valoreLancio = Math.floor(Math.random() * 6 + 1);
          if (valoreIniziale === valoreLancio) {
            console.log(
              `Complimenti, ti è uscito di nuovo lo stesso numero`,
              valoreLancio
            );
          }
          console.log("Il valore uscito è:", valoreLancio);
          valoreIniziale = valoreLancio;

          resolve(valoreIniziale);
        }
      }, 3000);
    });
  };
}

const lancioContinuo = creaLanciaDado();

lancioContinuo()
  .then((result) => {
    console.log("Il risultato finale è:", result);
    lancioContinuo()
      .then((result) => console.log("Il risultato finale è:", result))
      .catch((error) => console.log(error));
  })
  .catch((error) => console.log(error));
