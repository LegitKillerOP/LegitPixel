import React from 'react';

type NewsCardProps = {
  title: string;
  subtitle?: string;
  date: string;
  content: string;
  color: 'green' | 'red' | 'orange';
};

const colorMap = {
  green: 'bg-green-800',
  red: 'bg-red-900',
  orange: 'bg-orange-800'
};

const NewsCard: React.FC<NewsCardProps> = ({ title, subtitle, date, content, color }) => (
  <div className="content-frame p-6 mb-6 bg-[rgba(139,69,19,0.9)] border-[3px] border-[#8B4513] rounded-xl shadow-inner shadow-black">
    <div className="flex justify-between text-white text-sm mb-4">
      <span>{title}</span>
      <span>{date}</span>
    </div>
    <div className={`${colorMap[color]} text-white p-8 rounded text-center mb-4`}>
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      {subtitle && <h3 className="text-xl mb-4">{subtitle}</h3>}
    </div>
    <div className="text-white text-sm mb-4">{content}</div>
    <div className="text-right">
      <button className="bg-gray-600 text-white px-4 py-1 rounded text-sm">Read more...</button>
    </div>
  </div>
);

export default NewsCard;
