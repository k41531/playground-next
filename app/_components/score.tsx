interface ScoreProps {
	score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
	return (
		<div data-testid="score" className="score">
			<h2 className="text-xl font-semibold">スコア</h2>
			<p className="text-8xl text-gray-600">{score}</p>
		</div>
	);
};

export default Score;
