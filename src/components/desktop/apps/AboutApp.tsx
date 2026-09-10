import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getAboutData } from '@/data/about'

export function AboutApp() {
  const about = getAboutData()

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-zinc-900/50 to-black/50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            {about.name}
          </h1>
          <p className="text-xl text-gray-300">{about.role}</p>
          <p className="text-gray-400">{about.tagline}</p>
        </div>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 leading-relaxed">{about.bio}</p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-cyan-400 border-cyan-400/50">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-gray-300">
              <span className="text-gray-500">Email:</span> {about.email}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-500">GitHub:</span>{' '}
              <a
                href={about.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                {about.github.replace('https://github.com/', '@')}
              </a>
            </p>
            <p className="text-gray-300">
              <span className="text-gray-500">LinkedIn:</span>{' '}
              <a
                href={about.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                Profile
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
