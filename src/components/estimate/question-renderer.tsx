import type { AnswerValue, Question } from "@/lib/estimate/types";
import { FieldGroup } from "./field-group";
import { MultiChoice } from "./multi-choice";
import { SingleChoice } from "./single-choice";
import { SizeChoice } from "./size-choice";

export function QuestionRenderer({
  question,
  value,
  onChange,
  onSingleSelect,
  priceHints,
}: {
  question: Question;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
  onSingleSelect: (value: string) => void;
  priceHints?: Record<string, string> | undefined;
}) {
  switch (question.type) {
    case "single":
      if (question.role === "size")
        return (
          <SizeChoice
            question={question}
            value={value as string | undefined}
            onSelect={onSingleSelect}
          />
        );
      return (
        <SingleChoice
          question={question}
          value={value as string | undefined}
          onSelect={onSingleSelect}
          priceHints={priceHints}
        />
      );
    case "multi":
      return (
        <MultiChoice question={question} value={(value as string[]) || []} onChange={onChange} />
      );
    case "fieldGroup":
      return (
        <FieldGroup
          question={question}
          value={(value as Record<string, string>) || {}}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
}
