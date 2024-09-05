import './App.css';
import BoardClass from './classes/Board';
import { FormEvent, useEffect, useState } from 'react';
import PlayerClass from './classes/Player';

function App() {

  const COMPUTER_DELAY = 1000;
  const [state, _setState] = useState({
    board: new BoardClass(() => setState()),
    playerRed: null as PlayerClass | null,
    playerYellow: null as PlayerClass | null,
  });

    const setState = (prop: string = '', value: any = '') => {
        _setState({ ...state, [prop]: value });
    };

    const { board, playerRed, playerYellow } = state;

  useEffect(() => {
    if (playerYellow?.isAI && board.currentPlayer === 'Yellow' && !board.gameOver) {
      setTimeout(() => playerYellow.makeAIMove(board), COMPUTER_DELAY);
    }
    if (playerRed?.isAI && board.currentPlayer === 'Red' && !board.gameOver) {
      setTimeout(() => playerRed.makeAIMove(board), COMPUTER_DELAY);
    }
  }, [setState]);

  function registerName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const playerRed = form.elements[0] as HTMLInputElement;
    const playerYellow = form.elements[1] as HTMLInputElement;
    state.playerRed = new PlayerClass(playerRed.value, 'Red');
    state.playerYellow = new PlayerClass(playerYellow.value, 'Yellow');
    console.log(state.playerYellow);
    console.log(state.playerRed);
    board.stateUpdater();
  }

    const CreatePlayer = () => {
        return (
            <form
                className='modal'
                onSubmit={registerName}
            >
                <h2>change player</h2>
                <div className='player-selection'>
                    <label>Red Player</label>
                    <input
                        type='text'
                        name='playerRed'
                        placeholder='Namn på röd spelare'
                    />
                </div>
                <div className='player-selection'>
                    <label>Yellow Player</label>
                    <input
                        type='text'
                        name='playerRed'
                        placeholder='Namn på röd spelare'
                    />
                </div>
                <button type='submit'>Start Game</button>
            </form>
        );
    };
    const handleResetGame = () => {
        board.resetBoard();
    };

    const handleNewGame = () => {
        setState('board', new BoardClass(() => setState()));
        setState('playerRed', null);
        setState('playerYellow', null);
        window.location.reload();
    };
    const ViewWinner = () => {
        return (
            <div className='gameover-info'>
                {board.winner ? (
                    <>
                        <h2>The winner is</h2>

                        <div className='winner-display'>
                            {' '}
                            <h3 className={state.board.winner === '' ? '' : state.board.winner === 'Red' ? 'red-text' : 'yellow-text'}>
                                {' '}
                                ({state.board.winner})
                            </h3>
                            <h3 className={state.board.winner === '' ? '' : state.board.winner === 'Red' ? 'red-text' : 'yellow-text'}>
                                {state.board.winner === 'Red' ? playerRed!.name : playerYellow!.name}
                            </h3>
                        </div>
                    </>
                ) : (
                    <>
                        {' '}
                        <h2>It's a tie.</h2>
                    </>
                )}
                <div className='gameover-btn'>
                    <button
                        className='reset-btn'
                        onClick={handleResetGame}
                    >
                        Reset Game
                    </button>

  };

  return (
    <>
      {!playerRed || !playerYellow ? (
        <CreatePlayer />
      ) : (
        board.render(playerRed, playerYellow)
      )}
      {!board.gameOver ? (
        <div className="game-currentplayer"></div>
      ) : (
        <ViewWinner />
      )}
    </>
  );
}

export default App;
