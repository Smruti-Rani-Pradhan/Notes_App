import { useRef, useState } from "react";
import { 
  Save, 
  Trash2, 
  Clock, 
  Star, 
  RotateCcw,
  Bold,
  Italic,
  Heading,
  List,
  CheckSquare,
  Code,
  Eye,
  EyeOff,
  X,
  Palette,
  ArrowLeft
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NOTE_COLORS } from "@/lib/colors";

export default function NoteEditorForm({
  title,
  content,
  tags = [],
  color = "default",
  setTitle,
  setContent,
  setTags,
  setColor,
  loading,
  onSave,
  onDelete,
  onFavorite,
  onRestore,
  onPermanentDelete,
  onBack,
  isExisting,
  isFavorite,
  isTrash,
  updatedAt,
}) {
  const textareaRef = useRef(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const activeColor = NOTE_COLORS[color] || NOTE_COLORS.default;
  const editorFont = localStorage.getItem("editorFont") || "font-sans";

  // Insert markdown helpers
  const insertMarkdown = (syntax) => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    let replacement = "";
    if (syntax === "bold") {
      replacement = `**${selected || "bold text"}**`;
    } else if (syntax === "italic") {
      replacement = `*${selected || "italic text"}*`;
    } else if (syntax === "heading") {
      replacement = `\n# ${selected || "Heading"}\n`;
    } else if (syntax === "list") {
      replacement = `\n- ${selected || "list item"}\n`;
    } else if (syntax === "todo") {
      replacement = `\n- [ ] ${selected || "task"}\n`;
    } else if (syntax === "code") {
      replacement = `\n\`\`\`\n${selected || "code"}\n\`\`\`\n`;
    }

    const newContent = before + replacement + after;
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + replacement.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // Add tag
  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const cleaned = tagInput.trim().toLowerCase().replace(/#/g, "");
      if (cleaned && !tags.includes(cleaned)) {
        setTags([...tags, cleaned]);
      }
      setTagInput("");
    }
  };

  // Remove tag
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Simple Markdown Renderer
  const renderMarkdown = (text) => {
    if (!text) return <p className="text-muted-foreground/60 italic">No content written yet...</p>;
    
    const lines = text.split("\n");
    let inCodeBlock = false;
    let codeLines = [];
    const elements = [];

    const parseInline = (line, lineIdx) => {
      const regex = /(\*\*.*?\*\*|__.*?__|\*.*?\*|_.*?_|`.*?`)/g;
      const parts = line.split(regex);
      if (parts.length === 1) return line;

      return parts.map((part, index) => {
        const key = `inline-${lineIdx}-${index}`;
        if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
          return <strong key={key} className="font-extrabold">{part.slice(2, -2)}</strong>;
        }
        if ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) {
          return <em key={key} className="italic">{part.slice(1, -1)}</em>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={key} className="px-1.5 py-0.5 rounded bg-muted/80 text-sm font-mono border border-muted-foreground/10 text-rose-600 dark:text-rose-400">
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      });
    };

    for (let idx = 0; idx < lines.length; idx++) {
      const line = lines[idx];

      // Code Block
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          // Closing code block
          elements.push(
            <pre key={`code-${idx}`} className="my-4 overflow-x-auto rounded-xl bg-zinc-950 p-4 text-sm font-mono text-zinc-100 border border-muted/20">
              <code>{codeLines.join("\n")}</code>
            </pre>
          );
          codeLines = [];
          inCodeBlock = false;
        } else {
          // Opening code block
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        continue;
      }

      // Headers
      if (line.startsWith("# ")) {
        elements.push(<h1 key={idx} className="text-3xl font-bold mt-6 mb-3 tracking-tight border-b pb-1 border-muted/20">{parseInline(line.slice(2), idx)}</h1>);
        continue;
      }
      if (line.startsWith("## ")) {
        elements.push(<h2 key={idx} className="text-2xl font-bold mt-5 mb-2.5 tracking-tight">{parseInline(line.slice(3), idx)}</h2>);
        continue;
      }
      if (line.startsWith("### ")) {
        elements.push(<h3 key={idx} className="text-xl font-bold mt-4 mb-2 tracking-tight">{parseInline(line.slice(4), idx)}</h3>);
        continue;
      }
      
      // Checkboxes
      if (line.startsWith("- [ ] ") || line.startsWith("- [x] ")) {
        const checked = line.startsWith("- [x] ");
        elements.push(
          <div key={idx} className="flex items-center gap-3 my-1.5">
            <input type="checkbox" checked={checked} readOnly className="h-4.5 w-4.5 rounded border-muted-foreground/30 text-primary cursor-not-allowed" />
            <span className={`text-base ${checked ? "line-through text-muted-foreground/65" : ""}`}>{parseInline(line.slice(6), idx)}</span>
          </div>
        );
        continue;
      }
      
      // Lists
      if (line.startsWith("- ") || line.startsWith("* ")) {
        elements.push(<li key={idx} className="ml-6 list-disc my-1.5 text-base">{parseInline(line.slice(2), idx)}</li>);
        continue;
      }
      
      // Empty line
      if (line.trim() === "") {
        elements.push(<div key={idx} className="h-4"></div>);
        continue;
      }

      // Text formatting (bold/italic/code) parsed
      elements.push(
        <p key={idx} className="my-2 text-base leading-relaxed tracking-wide">
          {parseInline(line, idx)}
        </p>
      );
    }

    return elements;
  };

  return (
    <div className={`flex h-full flex-col transition-all duration-300 ${activeColor.bg}`}>
      
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-muted/15 px-6 py-4.5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8 rounded-lg cursor-pointer text-muted-foreground hover:text-foreground mr-1"
              onClick={onBack}
              title="Back to list"
            >
              <ArrowLeft size={18} />
            </Button>
            <h2 className="text-lg font-bold tracking-tight">
              {isTrash ? "Deleted Note" : isExisting ? "Edit Note" : "New Note"}
            </h2>
          </div>

          {updatedAt && (
            <div className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground/80">
              <Clock size={12} />
              <span>
                {isTrash ? "Deleted" : "Updated"}{" "}
                {new Date(updatedAt).toLocaleString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Colors Trigger */}
          {!isTrash && (
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowColorPicker(!showColorPicker)}
                disabled={loading}
                title="Change color"
                className="rounded-full shadow-sm hover:scale-105 active:scale-95 transition-transform"
              >
                <Palette size={16} />
              </Button>

              {showColorPicker && (
                <div className="absolute right-0 top-12 z-50 flex gap-2 rounded-2xl border bg-popover p-3 shadow-xl backdrop-blur animate-in fade-in zoom-in-95 duration-100">
                  {Object.entries(NOTE_COLORS).map(([colorName, details]) => (
                    <button
                      key={colorName}
                      onClick={() => {
                        setColor(colorName);
                        setShowColorPicker(false);
                      }}
                      className={`h-6 w-6 rounded-full border border-black/10 transition-transform hover:scale-110 active:scale-90 ${details.pickerBg} cursor-pointer`}
                      title={details.name}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {isTrash ? (
            <>
              <Button
                variant="outline"
                onClick={onRestore}
                disabled={loading}
                className="rounded-xl shadow-sm hover:bg-muted"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Restore
              </Button>

              <Button
                variant="destructive"
                onClick={onPermanentDelete}
                disabled={loading}
                className="rounded-xl shadow-md"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Forever
              </Button>
            </>
          ) : (
            <>
              {isExisting && (
                <Button
                  variant="outline"
                  onClick={onFavorite}
                  disabled={loading}
                  className="rounded-xl shadow-sm hover:scale-102 active:scale-98 transition-transform"
                >
                  <Star
                    className={`mr-2 h-4 w-4 ${
                      isFavorite ? "fill-amber-400 text-amber-500 animate-in spin-in-45 duration-300" : ""
                    }`}
                  />
                  {isFavorite ? "Favorited" : "Favorite"}
                </Button>
              )}

              {isExisting && (
                <Button
                  variant="destructive"
                  onClick={onDelete}
                  disabled={loading}
                  className="rounded-xl shadow-sm hover:scale-102 active:scale-98 transition-transform"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Trash
                </Button>
              )}

              <Button
                onClick={onSave}
                disabled={loading}
                className="rounded-xl shadow-md hover:scale-102 active:scale-98 transition-transform bg-primary text-primary-foreground font-semibold px-5"
              >
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save"}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Editor & Formatting Toolbar */}
      {!isTrash && (
        <div className="flex items-center gap-1.5 border-b border-muted/10 px-6 py-2.5 bg-black/5 dark:bg-white/5 backdrop-blur-xs overflow-x-auto scrollbar-none max-w-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => insertMarkdown("bold")}
            title="Bold (**text**)"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground shrink-0"
          >
            <Bold size={15} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => insertMarkdown("italic")}
            title="Italic (*text*)"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground shrink-0"
          >
            <Italic size={15} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => insertMarkdown("heading")}
            title="Heading (#)"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground shrink-0"
          >
            <Heading size={15} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => insertMarkdown("list")}
            title="List (-)"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground shrink-0"
          >
            <List size={15} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => insertMarkdown("todo")}
            title="Todo (- [ ])"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground shrink-0"
          >
            <CheckSquare size={15} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => insertMarkdown("code")}
            title="Code Block (```)"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground shrink-0"
          >
            <Code size={15} />
          </Button>

          <div className="ml-auto flex items-center border-l border-muted/20 pl-2.5 shrink-0">
            <Button
              variant={previewMode ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
              className="h-7 rounded-lg text-xs font-semibold px-2.5 shrink-0"
            >
              {previewMode ? (
                <>
                  <EyeOff className="mr-1.5 h-3.5 w-3.5" />
                  Edit
                </>
              ) : (
                <>
                  <Eye className="mr-1.5 h-3.5 w-3.5" />
                  Preview
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Editor Body */}
      <div className="flex flex-1 flex-col p-6 lg:p-8 overflow-y-auto">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Note"
          disabled={isTrash}
          className="h-auto border-none px-0 text-3xl font-extrabold shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/35 bg-transparent"
        />

        {previewMode ? (
          <div className={`mt-6 flex-1 overflow-y-auto prose dark:prose-invert max-w-none text-foreground border border-dashed border-muted/20 rounded-xl p-4.5 bg-muted/5 ${editorFont}`}>
            {renderMarkdown(content)}
          </div>
        ) : (
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing in markdown..."
            disabled={isTrash}
            className={`mt-6 flex-1 resize-none border-none px-0 text-base leading-relaxed shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/35 bg-transparent ${editorFont}`}
          />
        )}

        {/* Tags badges inline editor */}
        {!isTrash && (
          <div className="mt-6 border-t border-muted/10 pt-5">
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-xl bg-primary/10 dark:bg-primary/20 px-3 py-1 text-xs font-semibold text-primary"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-primary hover:bg-primary/25 cursor-pointer"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}

              <Input
                type="text"
                placeholder="Add tags..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="h-7 w-28 rounded-xl border border-muted/20 bg-transparent px-2.5 text-xs focus-visible:ring-1 focus-visible:ring-primary shadow-none placeholder:text-muted-foreground/45"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-muted/10 px-6 py-4.5 text-xs font-semibold text-muted-foreground/75 lg:px-8 bg-black/5 dark:bg-white/5">
        <span>
          {isTrash ? "Restore to edit again" : "Press Ctrl + S to save"}
        </span>

        <span className="flex gap-4">
          <span>{tags.length} tags</span>
          <span>{content.replace(/\s+/g, "").length} characters</span>
          <span>{content.trim() === "" ? 0 : content.trim().split(/\s+/).length} words</span>
        </span>
      </div>

    </div>
  );
}
