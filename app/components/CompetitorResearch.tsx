import { useState } from 'react';

type CompetitorReport = {
  overview: string;
  products: string[];
  strengths: string[];
  weaknesses: string[];
};

const CompetitorResearch: React.FC<{ businessId: string }> = ({ businessId }) => {
  const [competitor, setCompetitor] = useState('');
  const [report, setReport] = useState<CompetitorReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [followUp, setFollowUp] = useState('');

  const startResearch = async () => {
    if (!competitor) return;
    setLoading(true);
    setReport(null);
    try {
      const res = await fetch('/api/competitor/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId, competitor })
      });
      const data = await res.json();
      if (data.report) {
        setReport(data.report);
      }
    } catch (err) {
      console.error('Error during competitor research:', err);
      alert('Competitor research failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const askFollowUp = async () => {
    if (!report || !followUp) return;
    try {
      const res = await fetch('/api/competitor/followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId, competitor, question: followUp, existingReport: report })
      });
      const data = await res.json();
      if (data.update) {
        setReport(prev => prev ? { ...prev, ...data.update } : prev);
      }
    } catch (err) {
      console.error('Follow-up question failed:', err);
    }
  };

  return (
    <div className="competitor-research-tab">
      <h3>Competitor Research</h3>
      <input 
        type="text" 
        value={competitor} 
        onChange={e => setCompetitor(e.target.value)} 
        placeholder="Enter Competitor Name" 
      />
      <button onClick={startResearch} disabled={loading}>
        {loading ? 'Researching...' : 'Start Research'}
      </button>

      {report && (
        <div className="report">
          <h4>Overview</h4>
          <p>{report.overview}</p>
          <h4>Key Products/Services</h4>
          <ul>{report.products.map((p, idx) => <li key={idx}>{p}</li>)}</ul>
          <h4>Strengths</h4>
          <ul>{report.strengths.map((s, idx) => <li key={idx}>{s}</li>)}</ul>
          <h4>Weaknesses</h4>
          <ul>{report.weaknesses.map((w, idx) => <li key={idx}>{w}</li>)}</ul>
        </div>
      )}

      {report && (
        <div className="follow-up">
          <h4>Ask a follow-up question about {competitor}:</h4>
          <input 
            type="text" 
            value={followUp} 
            onChange={e => setFollowUp(e.target.value)} 
            placeholder="E.g., What is their pricing model?" 
          />
          <button onClick={askFollowUp}>Ask</button>
        </div>
      )}
    </div>
  );
};

export default CompetitorResearch;
