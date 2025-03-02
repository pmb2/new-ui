import { useState } from 'react';

const BrandAlignment: React.FC<{ businessId: string }> = ({ businessId }) => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!query) return;
    setLoading(true);
    setAnswer(null);
    try {
      const res = await fetch('/api/brandAlignment/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId, query })
      });
      const data = await res.json();
      if (data.answer) {
        setAnswer(data.answer);
      }
    } catch (err) {
      console.error('Error fetching brand alignment answer:', err);
      setAnswer("Sorry, an error occurred while retrieving brand insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="brand-alignment-tab">
      <h3>Brand Alignment Q&A</h3>
      <textarea 
        value={query} 
        onChange={e => setQuery(e.target.value)} 
        placeholder="Ask a question about brand guidelines or identity..." 
      />
      <button onClick={askQuestion} disabled={loading}>
        {loading ? 'Analyzing...' : 'Ask'}
      </button>

      {answer && (
        <div className="brand-answer">
          <h4>Answer:</h4>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default BrandAlignment;
