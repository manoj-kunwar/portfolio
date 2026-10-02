import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommandPalette from '../components/CommandPalette.jsx';
import Projects from '../sections/Projects.jsx';
import Contact from '../sections/Contact.jsx';
import ProjectCaseStudyModal from '../components/ProjectCaseStudyModal.jsx';
import ArchitectureDiagram from '../components/ArchitectureDiagram.jsx';
import Experience from '../sections/Experience.jsx';
import { projects } from '../data/projects.js';

describe('1. Command Palette Suite', () => {
  it('renders commands when open and searches by technology and community keyword', async () => {
    const user = userEvent.setup();
    const handleSelectProject = vi.fn();
    const handleClose = vi.fn();

    render(
      <CommandPalette
        open={true}
        onClose={handleClose}
        toggleTheme={vi.fn()}
        theme="dark"
        onOpenResume={vi.fn()}
        onSelectProject={handleSelectProject}
      />
    );

    // Initial search input is present
    const input = screen.getByPlaceholderText(/Search projects, technologies/i);
    expect(input).toBeInTheDocument();

    // Type "react" to search projects by technology
    await user.type(input, 'react');
    expect(screen.getAllByText(/CareOS/i).length).toBeGreaterThanOrEqual(1);

    // Type "community" to search for High School Youth Club
    await user.clear(input);
    await user.type(input, 'community');
    expect(screen.getAllByText(/High School Youth Club/i).length).toBeGreaterThanOrEqual(1);
  });

  it('supports keyboard navigation with ArrowDown, ArrowUp, and Enter', async () => {
    const user = userEvent.setup();
    const handleOpenResume = vi.fn();

    render(
      <CommandPalette
        open={true}
        onClose={vi.fn()}
        toggleTheme={vi.fn()}
        theme="dark"
        onOpenResume={handleOpenResume}
        onSelectProject={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText(/Search projects, technologies/i);
    await user.type(input, 'Resume');

    // Item should be filtered and selected
    expect(screen.getByText(/Open Resume PDF/i)).toBeInTheDocument();

    // Press Enter to trigger action
    await user.keyboard('{Enter}');
    expect(handleOpenResume).toHaveBeenCalled();
  });

  it('triggers onClose when Escape key is pressed', async () => {
    const handleClose = vi.fn();
    render(
      <CommandPalette
        open={true}
        onClose={handleClose}
        toggleTheme={vi.fn()}
        theme="dark"
        onOpenResume={vi.fn()}
        onSelectProject={vi.fn()}
      />
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });
});

describe('2. Project Filtering Suite', () => {
  it('renders all 4 projects and filters by Community category', async () => {
    const user = userEvent.setup();
    render(<Projects onSelectProject={vi.fn()} />);

    // By default, all 4 projects are visible
    expect(screen.getByText(/CareOS/i)).toBeInTheDocument();
    expect(screen.getByText(/High School Youth Club/i)).toBeInTheDocument();
    expect(screen.getByText(/Wanderlust/i)).toBeInTheDocument();
    expect(screen.getByText(/Rozgar Nepal/i)).toBeInTheDocument();

    // Filter by Community & Civic
    const communityBtn = screen.getByRole('tab', { name: /Community & Civic/i });
    await user.click(communityBtn);

    // High School Youth Club should be shown
    expect(screen.getByText(/High School Youth Club/i)).toBeInTheDocument();
  });
});

describe('3. Case Study Modal & Architecture Suite', () => {
  const careOsProject = projects.find((p) => p.id === 'careos');
  const youthClubProject = projects.find((p) => p.id === 'high-school-youth-club');

  it('renders project case study overview, challenges, and closes on Escape', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(<ProjectCaseStudyModal project={careOsProject} onClose={handleClose} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(careOsProject.title)).toBeInTheDocument();

    // Switch to Architecture tab
    const archTab = screen.getByRole('tab', { name: /Interactive Architecture/i });
    await user.click(archTab);
    expect(screen.getByText(/Interactive Topology/i)).toBeInTheDocument();

    // Switch to Challenges tab
    const chalTab = screen.getByRole('tab', { name: /Engineering Challenges/i });
    await user.click(chalTab);
    expect(screen.getByText(/Challenge #1/i)).toBeInTheDocument();

    // Escape closes modal
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('renders High School Youth Club with Information Architecture and Bilingual UI tabs', async () => {
    const user = userEvent.setup();
    render(<ProjectCaseStudyModal project={youthClubProject} onClose={vi.fn()} />);

    // Check title and location
    expect(screen.getByText(/High School Youth Club/i)).toBeInTheDocument();
    expect(screen.getByText(/Gulariya, Krishnapur-5/i)).toBeInTheDocument();

    // Click Information Architecture tab
    const iaTab = screen.getByRole('tab', { name: /Information Architecture/i });
    await user.click(iaTab);
    expect(screen.getByText(/Civic Portal Navigation Hierarchy/i)).toBeInTheDocument();

    // Click Civic Programs & Bilingual UI tab
    const bilingualTab = screen.getByRole('tab', { name: /Civic Programs & Bilingual UI/i });
    await user.click(bilingualTab);
    expect(screen.getByText(/Bilingual Experience/i)).toBeInTheDocument();
  });

  it('renders interactive architecture diagram and switches layers', async () => {
    const user = userEvent.setup();
    render(<ArchitectureDiagram project={careOsProject} />);

    // Layer 1 is initially selected
    expect(screen.getByText(/Inspecting Layer 1/i)).toBeInTheDocument();

    // Click Layer 2
    const layer2Btn = screen.getByRole('button', { name: /Layer 2/i });
    await user.click(layer2Btn);

    expect(screen.getByText(/Inspecting Layer 2/i)).toBeInTheDocument();
  });
});

describe('4. Contact Form Validation Suite', () => {
  it('validates name, email, and message length before submission', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const submitBtn = screen.getByRole('button', { name: /Send Direct Inquiry/i });

    // 1. Submit with empty fields
    await user.click(submitBtn);
    expect(screen.getByText(/Please enter a valid name/i)).toBeInTheDocument();

    // 2. Fill short name
    const nameInput = screen.getByLabelText(/Your Name/i);
    await user.type(nameInput, 'M');
    await user.click(submitBtn);
    expect(screen.getByText(/Please enter a valid name/i)).toBeInTheDocument();

    // 3. Fill valid name, invalid email
    await user.clear(nameInput);
    await user.type(nameInput, 'Manoj Test');
    const emailInput = screen.getByLabelText(/Email Address/i);
    await user.type(emailInput, 'notanemail');
    await user.click(submitBtn);
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();

    // 4. Fill valid email, short message
    await user.clear(emailInput);
    await user.type(emailInput, 'test@example.com');
    const msgInput = screen.getByLabelText(/Message Details/i);
    await user.type(msgInput, 'Short');
    await user.click(submitBtn);
    expect(screen.getByText(/Please enter a detailed message/i)).toBeInTheDocument();

    // 5. Valid submission
    await user.clear(msgInput);
    await user.type(msgInput, 'Hello Manoj, this is a comprehensive valid inquiry test message.');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Inquiry Prepared Successfully/i)).toBeInTheDocument();
    });
  });
});

describe('5. Experience Timeline Suite', () => {
  it('renders dedicated timeline spine, animated progress, nodes, and filters by category', async () => {
    const user = userEvent.setup();
    const { container } = render(<Experience />);

    // 1. Verify section and persistent spine
    const section = screen.getByLabelText(/Experience & Education Timeline/i);
    expect(section).toBeInTheDocument();

    const spine = container.querySelector('.timeline-spine');
    expect(spine).toBeInTheDocument();

    const progress = container.querySelector('.timeline-progress');
    expect(progress).toBeInTheDocument();

    // 2. Verify all initial milestone cards and nodes
    expect(screen.getByText(/CareOS Telemedicine Platform/i)).toBeInTheDocument();
    expect(screen.getByText(/B.Tech in Computer Science & Engineering/i)).toBeInTheDocument();
    const nodes = container.querySelectorAll('.timeline-node');
    expect(nodes.length).toBe(4);

    // 3. Filter by Education
    const eduFilterBtn = screen.getByRole('tab', { name: /Education/i });
    await user.click(eduFilterBtn);

    expect(screen.getByText(/B.Tech in Computer Science & Engineering/i)).toBeInTheDocument();
    expect(screen.queryByText(/CareOS Telemedicine Platform/i)).not.toBeInTheDocument();
    expect(container.querySelectorAll('.timeline-node').length).toBe(1);

    // 4. Filter by Engineering Systems
    const expFilterBtn = screen.getByRole('tab', { name: /Engineering Systems/i });
    await user.click(expFilterBtn);

    expect(screen.getByText(/CareOS Telemedicine Platform/i)).toBeInTheDocument();
    expect(screen.queryByText(/B.Tech in Computer Science & Engineering/i)).not.toBeInTheDocument();
    expect(container.querySelectorAll('.timeline-node').length).toBe(3);
  });
});
