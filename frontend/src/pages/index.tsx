import { useState, useEffect } from 'react';
import { getIssues, addIssue, updateIssue, deleteIssue } from '../services/issueService';
import IssueList from '../components/IssueList';
import AddIssueForm from '../components/AddIssueForm';

interface Issue {
  id: number;
  title: string;
  description: string;
}

const IndexPage: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const data = await getIssues();
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const handleAddIssue = async (issue: { title: string; description: string }) => {
    try {
      await addIssue(issue);
      fetchIssues();
    } catch (error) {
      console.error('Error adding issue:', error);
    }
  };

  const handleUpdateIssue = async (issue: Issue) => {
    try {
      await updateIssue(issue.id, issue);
      fetchIssues();
    } catch (error) {
      console.error('Error updating issue:', error);
    }
  };

  const handleDeleteIssue = async (id: number) => {
    try {
      await deleteIssue(id);
      fetchIssues();
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-500">Issue Tracker</h1>
      <AddIssueForm onAdd={handleAddIssue} />
      <IssueList issues={issues} onDelete={handleDeleteIssue} onUpdate={handleUpdateIssue} />
    </div>
  );
};

export default IndexPage;
