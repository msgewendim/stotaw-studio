import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { AdminHeader } from '@/components/admin/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImageUploader } from '@/components/upload/image-uploader'
import { DeleteProjectDialog } from '@/components/dialogs/delete-project-dialog'

export const Route = createFileRoute('/admin/_layout/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const passwordRequirements = [
    { label: 'At least 8 characters', met: newPassword.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(newPassword) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(newPassword) },
    { label: 'Contains number', met: /[0-9]/.test(newPassword) },
  ]

  return (
    <>
      <AdminHeader title="Settings" />

      <div className="p-6 max-w-4xl">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="site">Site Settings</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            {/* Profile Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Avatar */}
                <div>
                  <Label>Avatar</Label>
                  <div className="mt-2 w-24">
                    <ImageUploader
                      value={avatar}
                      onChange={(url) => setAvatar(url || '')}
                      aspectRatio="1/1"
                    />
                  </div>
                </div>

                {/* Name */}
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" className="mt-2" />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="hello@artist.com"
                    readOnly
                    className="mt-2 bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed
                  </p>
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="mt-2"
                  />
                </div>

                <Button className="bg-accent hover:bg-accent/90 text-white">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="https://instagram.com/..."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="behance">Behance</Label>
                  <Input
                    id="behance"
                    placeholder="https://behance.net/..."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input
                    id="youtube"
                    placeholder="https://youtube.com/..."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="twitter">Twitter/X</Label>
                  <Input
                    id="twitter"
                    placeholder="https://x.com/..."
                    className="mt-2"
                  />
                </div>

                <Button className="bg-accent hover:bg-accent/90 text-white">
                  Save Social Links
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Site Settings Tab */}
          <TabsContent value="site" className="space-y-6">
            {/* General */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="site-title">Site Title</Label>
                  <Input
                    id="site-title"
                    defaultValue="Digital Art Portfolio"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    defaultValue="Digital sketches exploring..."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="contact@artist.com"
                    className="mt-2"
                  />
                </div>

                <Button className="bg-accent hover:bg-accent/90 text-white">
                  Save General Settings
                </Button>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea
                    id="meta-description"
                    rows={3}
                    placeholder="Brief description for search engines..."
                    className="mt-2"
                  />
                </div>

                <Button className="bg-accent hover:bg-accent/90 text-white">
                  Save SEO Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-2"
                  />
                </div>

                {/* Password requirements */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Password requirements:</p>
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${
                          req.met ? 'bg-green-500' : 'bg-muted-foreground'
                        }`}
                      />
                      <p
                        className={`text-xs ${
                          req.met ? 'text-green-500' : 'text-muted-foreground'
                        }`}
                      >
                        {req.label}
                      </p>
                    </div>
                  ))}
                </div>

                <Button className="bg-accent hover:bg-accent/90 text-white">
                  Update Password
                </Button>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-500/20">
              <CardHeader>
                <CardTitle className="text-lg text-red-500">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you delete your account, there is no going back. Please be
                  certain.
                </p>
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Account Dialog */}
      <DeleteProjectDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        projectTitle="your account"
        onConfirm={() => {
          // Handle account deletion
          console.log('Delete account')
          setShowDeleteDialog(false)
        }}
      />
    </>
  )
}
