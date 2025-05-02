export function Message() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-2">Welcome to the MSU Computer Science course survey</h1>
        <p className="text-gray-700 text-base">
          This survey is created for the purpose of understanding how students who have or are currently in the Computer
          Science major at MSU feel about the curriculum. This survey will consist of numerical data about your performance
          within the class, personal enjoyment of the classes you’ve taken, and your expectations for those you haven’t.
          By the end of this survey, the data will be used to identify patterns and improve the curriculum for future students.
        </p>
      </div>
    );
  }
  
  export function Help() {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-2">Some helpful suggestions</h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>
            <strong>What might enjoyment mean?</strong> When you think of enjoyment, it refers to how likely you would be to take the class again
            or recommend it to someone on a similar career path.
          </li>
          <li>
            <strong>What if you haven’t taken the class?</strong> Specifically for electives or required courses you’ve missed, rate the course a 0 and provide a 1–5
            expectation score for how engaging/useful you think it might be.
          </li>
        </ul>
      </div>
    );
  }


