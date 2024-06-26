import React from 'react';

interface Issue {
  id: number;
  title: string;
  description: string;
}

interface Props {
  issues: Issue[];
  onDelete: (id: number) => void;
  onUpdate: (issue: Issue) => void;
}

const IssueList: React.FC<Props> = ({ issues, onDelete, onUpdate }) => {
  const handleDelete = (id: number) => {
    onDelete(id);
  };

  const handleUpdate = (issue: Issue) => {
    const newTitle = prompt('Update title', issue.title);
    const newDescription = prompt('Update description', issue.description);

    if (newTitle && newDescription) {
      onUpdate({ ...issue, title: newTitle, description: newDescription });
    }
  };

  return (
    <ul className="list-none p-0">
      {issues.map((issue) => (
        <li key={issue.id} className="bg-gray-100 mb-2 p-4 rounded">
          <h2 className="text-2xl font-semibold">{issue.title}</h2>
          <p className="text-gray-700">{issue.description}</p>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded mr-2"
            onClick={() => handleDelete(issue.id)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleUpdate(issue)}
          >
            Update
          </button>
        </li>
      ))}
    </ul>
  );
};

export default IssueList;
