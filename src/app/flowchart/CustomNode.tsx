import { useState, useCallback } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

interface NodeData {
  label: string;
  shape: 'circle' | 'triangle' | 'square';
  onChange: (id: string, newLabel: string) => void;
}

const CustomNode = ({ data, id }: NodeProps<any>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [labelText, setLabelText] = useState(data.label);

  const onDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsEditing(false);
    data.onChange(id, labelText);
  }, [id, labelText, data]);

  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setLabelText(evt.target.value);
  }, []);

  const getNodeClassName = () => {
    const baseClass = 'custom-node';
    switch (data.shape) {
      case 'circle':
        return `${baseClass} circle-node`;
      case 'triangle':
        return `${baseClass} triangle-node`;
      case 'square':
        return `${baseClass} square-node`;
      default:
        return baseClass;
    }
  };

  return (
    <div className={getNodeClassName()} onDoubleClick={onDoubleClick}>
      <Handle type="target" position={Position.Top} />
      {isEditing ? (
        <input
          className="nodrag node-input"
          value={labelText}
          onChange={onChange}
          onBlur={onBlur}
          autoFocus
        />
      ) : (
        <div className="node-label">{labelText}</div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode; 