import SurveyForm from './SurveyForm'
import {Message, Help} from './Messages'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-4">
        <Message />
        <Help />
        <SurveyForm />
      </div>
    </div>
  );
}

export default App;