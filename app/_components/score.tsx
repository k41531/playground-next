interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div data-testid="score" className="score">
      <h2 className="text-xl font-semibold mb-2">スコア</h2>
      <p>{score}</p>
    </div>
  )
}

export default Score