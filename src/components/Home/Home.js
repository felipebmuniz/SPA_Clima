import React from 'react';
import CardClima from '../CardClima/CardClima';
import styles from './Home.module.css';

const Home = () => {
  const [cidade, setCidade] = React.useState('');
  const [dados, setDados] = React.useState(null);

  function getClimaCidade() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=3b72f8ef1c537df0d217d2d0249332ef&lang=pt_br&units=metric`,
    )
      .then((response) => response.json())
      .then((json) => {
        setDados(json);
      })
      .catch((err) => {
        // trata se alguma das promises falhar
        console.error('Failed retrieving information', err);
      });
  }

  // React.useEffect(() => {
  // }, []);

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Enviou!!');
    getClimaCidade();
    // console.log(dados);
  }

  return (
    <>
      <header className={styles.header}>
        <h2>Clima SPA - Felipe</h2>
      </header>
      <main className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="cidade">
            Digite a cidade para efetuar a busca{' '}
          </label>
          <input
            className={styles.input}
            name="cidade"
            type="text"
            onChange={({ target }) => setCidade(target.value)}
            required
          />
          <button className={styles.button}>Buscar</button>
        </form>
        {dados && <CardClima dados={dados} />}
      </main>

      <footer className={styles.footer}>
        <p>Alguns direitos reservados. Felipe Dev.</p>
      </footer>
    </>
  );
};

export default Home;
