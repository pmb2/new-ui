import { useState } from 'react';

type StepResult = {
  step: string;
  status: 'pending' | 'pass' | 'fail' | 'needs-review';
  issue?: string;
};

const ComplianceChecklist: React.FC<{ businessId: string }> = ({ businessId }) => {
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');
  const [steps, setSteps] = useState<StepResult[]>([]);
  const [checking, setChecking] = useState(false);

  const startComplianceCheck = async () => {
    setChecking(true);
    setSteps([]); // Reset previous results
    try {
      const res = await fetch('/api/compliance/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId, mode })
      });
      const data = await res.json();
      if (data.steps) {
        setSteps(data.steps);
      }
    } catch (err) {
      console.error('Error starting compliance check:', err);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="compliance-tab">
      <label>
        <input 
          type="checkbox" 
          checked={mode === 'auto'} 
          onChange={e => setMode(e.target.checked ? 'auto' : 'manual')} 
        />
        {mode === 'auto' ? 'Full Automation' : 'Human-in-Loop'}
      </label>

      <button onClick={startComplianceCheck} disabled={checking}>
        {checking ? 'Checking...' : 'Start Compliance Check'}
      </button>

      <ul>
        {steps.map((step) => (
          <li key={step.step}>
            <strong>{step.step}:</strong>&nbsp;
            <span className={step.status}>{step.status.toUpperCase()}</span>
            {step.status === 'needs-review' && step.issue && (
              <em> - Attention required: {step.issue}</em>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplianceChecklist;
