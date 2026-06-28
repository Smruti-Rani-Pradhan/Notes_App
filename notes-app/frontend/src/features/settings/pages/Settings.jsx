import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { 
  User, 
  Lock, 
  Settings as SettingsIcon, 
  Download, 
  Palette, 
  Type, 
  ShieldAlert, 
  ArrowLeft 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updateProfile, updatePassword } from "../../auth/authSlice";
import useNotes from "@/features/notes/hooks/useNotes";
import { NOTE_COLORS } from "@/lib/colors";

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { notes } = useNotes();

  const [activeTab, setActiveTab] = useState("profile");

  // Profile Form State
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profileLoading, setProfileLoading] = useState(false);

  // Password Form State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Preferences State
  const [editorFont, setEditorFont] = useState(
    () => localStorage.getItem("editorFont") || "font-sans"
  );
  const [defaultNoteColor, setDefaultNoteColor] = useState(
    () => localStorage.getItem("defaultNoteColor") || "default"
  );

  // Handle Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!profileName.trim()) {
      toast.error("Name is required.");
      return;
    }
    setProfileLoading(true);
    try {
      const result = await dispatch(updateProfile({ name: profileName.trim() })).unwrap();
      toast.success("Profile name updated successfully!");
    } catch (err) {
      toast.error(err || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle Password Update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    setPasswordLoading(true);
    try {
      await dispatch(updatePassword({ oldPassword, newPassword })).unwrap();
      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err || "Failed to update password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  // Save Preferences
  const handleSavePreferences = () => {
    localStorage.setItem("editorFont", editorFont);
    localStorage.setItem("defaultNoteColor", defaultNoteColor);
    toast.success("Preferences saved successfully!");
  };

  // Export Notes
  const handleExportNotes = () => {
    try {
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(notes, null, 2)
      )}`;
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", jsonString);
      downloadAnchor.setAttribute(
        "download",
        `notes_backup_${new Date().toISOString().slice(0, 10)}.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      toast.success("Backup downloaded successfully!");
    } catch (err) {
      toast.error("Failed to export notes.");
    }
  };

  const tabs = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Palette },
    { id: "data", label: "Data Management", icon: SettingsIcon },
  ];

  return (
    <MainLayout>
      <div className="flex h-full flex-col max-w-5xl mx-auto space-y-6 overflow-y-auto pr-1">
        
        {/* Settings Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-xl hover:bg-muted cursor-pointer"
            title="Back to dashboard"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Settings</h1>
            <p className="text-sm font-semibold text-muted-foreground/80">
              Customize your account settings and note editor experience.
            </p>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 min-h-0">
          
          {/* Side Nav Menu */}
          <nav className="flex flex-row md:flex-col gap-1.5 md:col-span-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <Button
                  key={tab.id}
                  variant={isActive ? "secondary" : "ghost"}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full justify-start rounded-xl font-bold py-5.5 px-4 cursor-pointer shrink-0 transition-all ${
                    isActive ? "bg-muted/80 text-primary shadow-xs" : "text-muted-foreground/80 hover:bg-muted/50"
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {tab.label}
                </Button>
              );
            })}
          </nav>

          {/* Form Content Display */}
          <div className="md:col-span-8">
            
            {/* TAB: PROFILE */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                
                {/* Profile Edit Card */}
                <Card className="rounded-2xl border bg-card/50 shadow-sm backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold tracking-tight">Profile Details</CardTitle>
                    <CardDescription className="text-xs font-semibold text-muted-foreground/85">
                      Update your account name and review your details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/85">Full Name</label>
                        <Input
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          placeholder="Your Name"
                          className="rounded-xl bg-muted/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Email Address</label>
                        <Input
                          value={user?.email || ""}
                          disabled
                          className="rounded-xl bg-muted/65 cursor-not-allowed opacity-75 font-semibold"
                        />
                        <span className="text-[10px] font-semibold text-muted-foreground/60">
                          Email cannot be modified to protect account integrity.
                        </span>
                      </div>
                      <Button
                        type="submit"
                        disabled={profileLoading}
                        className="rounded-xl font-bold shadow-md shadow-primary/10 hover:scale-102 transition-transform cursor-pointer"
                      >
                        {profileLoading ? "Updating..." : "Save Profile"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Password Change Card */}
                <Card className="rounded-2xl border bg-card/50 shadow-sm backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold tracking-tight">Change Password</CardTitle>
                    <CardDescription className="text-xs font-semibold text-muted-foreground/85">
                      Ensure your account remains secure by updating your credentials.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/85">Current Password</label>
                        <Input
                          type="password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          placeholder="••••••••"
                          className="rounded-xl bg-muted/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/85">New Password</label>
                        <Input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="rounded-xl bg-muted/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/85">Confirm New Password</label>
                        <Input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="rounded-xl bg-muted/20"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={passwordLoading}
                        className="rounded-xl font-bold shadow-md shadow-primary/10 hover:scale-102 transition-transform cursor-pointer"
                      >
                        {passwordLoading ? "Updating..." : "Update Password"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

              </div>
            )}

            {/* TAB: PREFERENCES */}
            {activeTab === "preferences" && (
              <Card className="rounded-2xl border bg-card/50 shadow-sm backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-lg font-bold tracking-tight">Note Preferences</CardTitle>
                  <CardDescription className="text-xs font-semibold text-muted-foreground/85">
                    Customize your drafting workspace experience.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Font Customizer */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/85 flex items-center gap-1.5">
                      <Type size={14} />
                      Editor Font Style
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "font-sans", label: "Sans-Serif", desc: "Clean & Modern", preview: "Abc (Sans)" },
                        { id: "font-serif", label: "Serif", desc: "Classic & Literary", preview: "Abc (Serif)" },
                        { id: "font-mono", label: "Monospace", desc: "Code & Logic", preview: "Abc (Mono)" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setEditorFont(item.id)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center cursor-pointer transition-all ${
                            editorFont === item.id 
                              ? "border-primary bg-primary/5 ring-1 ring-primary" 
                              : "hover:border-foreground/20 bg-background/40"
                          }`}
                        >
                          <span className={`text-base font-semibold ${item.id}`}>{item.preview}</span>
                          <span className="text-[10px] text-muted-foreground font-semibold mt-1">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* New Note Default Color */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/85 flex items-center gap-1.5">
                      <Palette size={14} />
                      Default Note Color
                    </label>
                    <div className="flex flex-wrap gap-2.5 rounded-xl border bg-background/30 p-4.5">
                      {Object.entries(NOTE_COLORS).map(([colorName, details]) => (
                        <button
                          key={colorName}
                          onClick={() => setDefaultNoteColor(colorName)}
                          className={`h-7 w-7 rounded-full border border-black/10 transition-all hover:scale-115 active:scale-90 cursor-pointer flex items-center justify-center relative ${
                            details.pickerBg
                          } ${
                            defaultNoteColor === colorName 
                              ? "ring-2 ring-offset-2 ring-primary scale-110" 
                              : ""
                          }`}
                          title={details.name}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold text-muted-foreground/60">
                      New notes created will automatically start with this background color.
                    </span>
                  </div>

                  {/* Save Preferences Button */}
                  <div className="pt-2 border-t border-muted/15">
                    <Button
                      onClick={handleSavePreferences}
                      className="rounded-xl font-bold shadow-md shadow-primary/10 hover:scale-102 transition-transform cursor-pointer"
                    >
                      Save Preferences
                    </Button>
                  </div>

                </CardContent>
              </Card>
            )}

            {/* TAB: DATA MANAGEMENT */}
            {activeTab === "data" && (
              <Card className="rounded-2xl border bg-card/50 shadow-sm backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-lg font-bold tracking-tight text-destructive">Data Management</CardTitle>
                  <CardDescription className="text-xs font-semibold text-muted-foreground/85">
                    Back up, download, or review your cloud database records.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Export notes */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl border bg-background/25">
                    <div>
                      <h4 className="text-sm font-bold flex items-center gap-2">
                        <Download size={16} className="text-muted-foreground" />
                        Export Notes Backup
                      </h4>
                      <p className="text-xs text-muted-foreground/85 mt-1 font-medium">
                        Download a JSON snapshot of all your local and cloud records.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleExportNotes}
                      className="rounded-xl font-semibold cursor-pointer shrink-0"
                    >
                      Download Backup
                    </Button>
                  </div>

                  {/* Danger Zone */}
                  <div className="space-y-3 pt-4 border-t border-muted/15">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-destructive flex items-center gap-1.5">
                      <ShieldAlert size={14} />
                      Danger Zone
                    </h4>
                    
                    <div className="p-4.5 rounded-xl border border-destructive/20 bg-destructive/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h5 className="text-sm font-bold text-destructive">Reset Application Database</h5>
                        <p className="text-xs text-muted-foreground/85 mt-1 font-medium">
                          Permanently wipe all notes and cloud files. This action is irreversible.
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          toast.error("This dangerous action is protected. Please contact support.");
                        }}
                        className="rounded-xl font-bold cursor-pointer shrink-0"
                      >
                        Reset Database
                      </Button>
                    </div>
                  </div>

                </CardContent>
              </Card>
            )}

          </div>

        </div>

      </div>
    </MainLayout>
  );
}
