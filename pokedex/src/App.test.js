import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


 {
   /* <div className="moves">
          <h3>Moves:</h3>
          <ul>
            {pokemonData.moves.map((move) => (
              <li key={move.move.name}>
                {capitalizeFirstLetter(move.move.name)}
              </li>
            ))}
          </ul>
        </div> */
 }