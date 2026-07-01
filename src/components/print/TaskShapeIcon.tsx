export const MATHS_TASK_SHAPES = ['circle', 'triangle', 'square', 'star'] as const;

export type MathsTaskShape = (typeof MATHS_TASK_SHAPES)[number];

const SHAPE_LABELS: Record<MathsTaskShape, string> = {
  circle: 'Circle',
  triangle: 'Triangle',
  square: 'Square',
  star: 'Star',
};

interface TaskShapeIconProps {
  shape: MathsTaskShape;
  size?: number;
  className?: string;
}

export function taskShapeLabel(shape: MathsTaskShape) {
  return SHAPE_LABELS[shape];
}

export default function TaskShapeIcon({ shape, size = 28, className = '' }: TaskShapeIconProps) {
  const stroke = '#1a1a1a';
  const fill = '#e8e8e8';

  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={`print-task-shape ${className}`.trim()}
      aria-hidden
    >
      {shape === 'circle' && (
        <circle cx="16" cy="16" r="12" fill={fill} stroke={stroke} strokeWidth="2" />
      )}
      {shape === 'triangle' && (
        <polygon
          points="16,5 27,27 5,27"
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      )}
      {shape === 'square' && (
        <rect x="6" y="6" width="20" height="20" fill={fill} stroke={stroke} strokeWidth="2" />
      )}
      {shape === 'star' && (
        <polygon
          points="16,4 19.5,13 29,13 21.5,19 24.5,28 16,22.5 7.5,28 10.5,19 3,13 12.5,13"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
