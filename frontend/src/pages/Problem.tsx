import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { marked } from 'marked';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play } from 'lucide-react';

// Mock problem data - replace with actual API call
const problem = {
  id: 1,
  title: 'Two Sum',
  difficulty: 'Easy',
  markdown: `# Two Sum

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

## Examples

### Example 1:
**Input:** nums = [2,7,11,15], target = 9
**Output:** [0,1]
**Explanation:** Because nums[0] + nums[1] == 9, we return [0, 1].

## Constraints
- 2 <= nums.length <= 104
- -109 <= nums[i] <= 109
- -109 <= target <= 109
- Only one valid answer exists.`,
};

const languages = {
  javascript: {
    name: 'JavaScript',
    template: `function twoSum(nums, target) {
    // Write your code here
};`,
  },
  python: {
    name: 'Python',
    template: `def two_sum(nums, target):
    # Write your code here
    pass`,
  },
  cpp: {
    name: 'C++',
    template: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
    }
};`,
  },
  java: {
    name: 'Java',
    template: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
    }
}`,
  },
};

export default function Problem() {
  const { problemId } = useParams();
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(languages[value as keyof typeof languages].template);
  };

  const handleSubmit = () => {
    // Handle submission to backend
    console.log('Submitting code:', { language, code });
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="space-y-4">
        <Card className="p-6">
          <h1 className="text-2xl font-bold">{problem.title}</h1>
          <div 
            className="mt-4 prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: marked(problem.markdown) }}
          />
        </Card>
      </div>

      <div className="space-y-4">
        <Tabs defaultValue="code">
          <TabsList>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="testcases">Test Cases</TabsTrigger>
          </TabsList>
          <TabsContent value="code" className="space-y-4">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languages).map(([key, { name }]) => (
                  <SelectItem key={key} value={key}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="rounded-md border">
              <Editor
                height="60vh"
                language={language === 'cpp' ? 'cpp' : language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                }}
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSubmit}>
                <Play className="mr-2 h-4 w-4" />
                Run Code
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="testcases">
            <Card className="p-4">
              <p>Test cases will be displayed here</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}