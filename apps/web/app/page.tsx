import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@terus/ui";
import { Badge } from "@terus/ui";
import { Button } from "@terus/ui";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="default">Sprint 0</Badge>
            <Badge variant="secondary">Foundation</Badge>
          </div>
          <CardTitle className="display-lg">Terus Platform</CardTitle>
          <CardDescription className="body-lg">
            Supply Chain Intelligence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="heading-md text-text-primary">Status da Fundação</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-surface-elevated-2 border border-surface-border">
                <div className="caption text-text-secondary mb-1">Monorepo</div>
                <div className="body-md text-status-success">✓ Configurado</div>
              </div>
              <div className="p-4 rounded-lg bg-surface-elevated-2 border border-surface-border">
                <div className="caption text-text-secondary mb-1">
                  Next.js 14
                </div>
                <div className="body-md text-status-success">✓ App Router</div>
              </div>
              <div className="p-4 rounded-lg bg-surface-elevated-2 border border-surface-border">
                <div className="caption text-text-secondary mb-1">FastAPI</div>
                <div className="body-md text-status-success">✓ Estrutura</div>
              </div>
              <div className="p-4 rounded-lg bg-surface-elevated-2 border border-surface-border">
                <div className="caption text-text-secondary mb-1">
                  Design System
                </div>
                <div className="body-md text-status-success">✓ Base</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-surface-elevated-2 border border-surface-border">
            <p className="body-md text-text-secondary">
              Fundação técnica completa. Pronto para iniciar Sprint 1:
              Autenticação + Design System + Layouts.
            </p>
          </div>

          <div className="flex gap-4">
            <Button variant="primary" disabled>
              Iniciar Onboarding
            </Button>
            <Button variant="outline" disabled>
              Documentação
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
