import { ComponentPreview } from './view/[name]/component-preview'

const endpoints = [
    {
        href: '/registry',
        label: '/registry',
        description: 'Registry index for all Tailark items.',
    },
    {
        href: '/registry.json',
        label: '/registry.json',
        description: 'shadcn-compatible registry index.',
    },
    {
        href: '/registry/dusk-button',
        label: '/registry/{name}',
        description: 'Individual registry item endpoint.',
    },
]

export default function Home() {
    return (
        <ComponentPreview theme="dusk">
            <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-8 px-6 py-16">
                <div className="flex flex-col gap-3">
                    <p className="font-mono text-sm text-muted-foreground">Tailark Registry</p>
                    <h1 className="text-4xl font-semibold tracking-tight">Open source shadcn/ui registry for Tailark.</h1>
                    <p className="max-w-2xl text-lg leading-8 text-muted-foreground">This repository serves the public registry endpoints. The marketing site can live in a separate closed-source app and proxy these paths from the same domain.</p>
                </div>

                <div className="grid gap-3">
                    {endpoints.map((endpoint) => (
                        <a
                            className="rounded-xl border bg-card p-4 text-card-foreground transition hover:border-primary/50 hover:bg-accent hover:text-accent-foreground"
                            href={endpoint.href}
                            key={endpoint.href}
                        >
                            <span className="font-mono text-sm font-medium">{endpoint.label}</span>
                            <p className="mt-1 text-sm text-muted-foreground">{endpoint.description}</p>
                        </a>
                    ))}
                </div>
            </main>
        </ComponentPreview>
    )
}
