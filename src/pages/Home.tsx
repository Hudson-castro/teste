import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, User, Bell, Search, Plus, FileText, 
  MessageSquare, Star, ChevronRight, Filter, Home, Settings, 
  Phone, Mail, Edit, Trash2, CheckCircle, X, UserCheck, 
  Stethoscope, Building2, AlertCircle, History, LogOut, Lock, 
  Unlock, Eye, EyeOff, ArrowLeft, Save
} from 'lucide-react';

const UBSSalvadorSystem = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [userType, setUserType] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [screenHistory, setScreenHistory] = useState(['login']);
  const [isLocked, setIsLocked] = useState(false);

  // Bloquear navegação do navegador
  useEffect(() => {
    const handlePopState = (e) => {
      e.preventDefault();
      window.history.pushState(null, '', window.location.href);
    };
    
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Dados das Unidades de Saúde de Salvador
  const [healthUnits] = useState([
    {
      id: 1,
      name: "Centro de Saúde Dr. Eduardo R. Baia",
      address: "Rua Francisco Leitão, S/N, Centro - Salvador",
      phone: "(71) 6041-3860",
      schedule: "07:00-17:00",
      specialties: ["Clínica Geral", "Pediatria", "Ginecologia"],
      district: "Centro"
    },
    {
      id: 2,
      name: "Unidade Básica de Saúde da Federação",
      address: "Rua da Federação, S/N, Federação - Salvador",
      phone: "(71) 3202-1024",
      schedule: "07:00-17:00",
      specialties: ["Clínica Geral", "Dermatologia", "Cardiologia"],
      district: "Federação"
    },
    {
      id: 3,
      name: "Unidade de Saúde da Família São Marcos",
      address: "Rua São Marcos, S/N, São Marcos - Salvador",
      phone: "(71) 3202-1024",
      schedule: "07:00-17:00",
      specialties: ["Clínica Geral", "Ginecologia", "Pediatria"],
      district: "São Marcos"
    },
    {
      id: 4,
      name: "Unidade Básica de Saúde de Calabetão",
      address: "Rua Calabetão, S/N, Calabetão - Salvador",
      phone: "(71) 3202-1024",
      schedule: "07:00-17:00",
      specialties: ["Clínica Geral", "Geriatria", "Endocrinologia"],
      district: "Calabetão"
    },
    {
      id: 5,
      name: "Unidade de Saúde da Família Polêmica",
      address: "Rua Polêmica, S/N, Polêmica - Salvador",
      phone: "(71) 3202-1024",
      schedule: "07:00-17:00",
      specialties: ["Clínica Geral", "Psiquiatria", "Oftalmologia"],
      district: "Polêmica"
    }
  ]);

  // Dados dos Profissionais
  const [professionals, setProfessionals] = useState([
    {
      id: 1,
      name: "Dr. João Silva",
      cpf: "111.222.333-44",
      specialty: "Cardiologia",
      registration: "CRM 12345",
      available: "08:00-16:00",
      unitId: 2,
      unitName: "UBS da Federação",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Dra. Maria Oliveira",
      cpf: "555.666.777-88",
      specialty: "Ginecologia",
      registration: "CRM 67890",
      available: "14:00-18:00",
      unitId: 2,
      unitName: "UBS da Federação",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Dr. Carlos Souza",
      cpf: "999.111.222-33",
      specialty: "Pediatria",
      registration: "CRM 13579",
      available: "08:00-12:00",
      unitId: 3,
      unitName: "USF São Marcos",
      photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Dra. Ana Costa",
      cpf: "777.888.999-00",
      specialty: "Geriatria",
      registration: "CRM 24680",
      available: "07:00-15:00",
      unitId: 4,
      unitName: "UBS de Calabetão",
      photo: "https://images.unsplash.com/photo-1594824209347-fe5bb304b64c?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Dr. Pedro Almeida",
      cpf: "444.555.666-77",
      specialty: "Psiquiatria",
      registration: "CRM 97531",
      available: "13:00-17:00",
      unitId: 5,
      unitName: "USF Polêmica",
      photo: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Dr. Roberto Santos",
      cpf: "333.444.555-66",
      specialty: "Clínica Geral",
      registration: "CRM 11111",
      available: "07:00-15:00",
      unitId: 1,
      unitName: "Centro de Saúde Dr. Eduardo R. Baia",
      photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 7,
      name: "Dra. Lucia Ferreira",
      cpf: "222.333.444-55",
      specialty: "Dermatologia",
      registration: "CRM 22222",
      available: "08:00-16:00",
      unitId: 2,
      unitName: "UBS da Federação",
      photo: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=150&h=150&fit=crop&crop=face"
    }
  ]);

  // Dados dos Pacientes
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Maria Silva Santos",
      cpf: "123.456.789-10",
      phone: "(71) 99999-1234",
      email: "maria@email.com",
      birthDate: "1985-03-15",
      address: "Rua das Flores, 123 - Centro, Salvador - BA",
      susCard: "898.0001.2345.6789",
      password: "123456"
    },
    {
      id: 2,
      name: "João Oliveira Costa",
      cpf: "987.654.321-00",
      phone: "(71) 98888-5678",
      email: "joao@email.com",
      birthDate: "1990-07-22",
      address: "Av. Norte, 456 - Federação, Salvador - BA",
      susCard: "898.0002.3456.7890",
      password: "123456"
    },
    {
      id: 3,
      name: "Ana Paula Ribeiro",
      cpf: "456.789.123-45",
      phone: "(71) 97777-9999",
      email: "ana@email.com",
      birthDate: "1978-12-05",
      address: "Rua São Marcos, 789 - São Marcos, Salvador - BA",
      susCard: "898.0003.4567.8901",
      password: "123456"
    }
  ]);

  // Dados das Consultas com datas atuais e mais exemplos
  const [consultations, setConsultations] = useState([
    {
      id: 1,
      patientId: 1,
      professionalId: 1,
      patientName: "Maria Silva Santos",
      professionalName: "Dr. João Silva",
      specialty: "Cardiologia",
      date: "2024-10-15",
      time: "09:00",
      status: "Agendada",
      unitId: 2,
      unitName: "UBS da Federação",
      notes: ""
    },
    {
      id: 2,
      patientId: 2,
      professionalId: 2,
      patientName: "João Oliveira Costa",
      professionalName: "Dra. Maria Oliveira",
      specialty: "Ginecologia",
      date: "2024-10-20",
      time: "15:00",
      status: "Agendada",
      unitId: 2,
      unitName: "UBS da Federação",
      notes: ""
    },
    {
      id: 3,
      patientId: 1,
      professionalId: 3,
      patientName: "Maria Silva Santos",
      professionalName: "Dr. Carlos Souza",
      specialty: "Pediatria",
      date: "2024-09-15",
      time: "10:00",
      status: "Realizada",
      unitId: 3,
      unitName: "USF São Marcos",
      notes: "Consulta de rotina realizada com sucesso. Paciente apresentou bom estado geral."
    },
    {
      id: 4,
      patientId: 1,
      professionalId: 1,
      patientName: "Maria Silva Santos",
      professionalName: "Dr. João Silva",
      specialty: "Cardiologia",
      date: "2024-10-25",
      time: "10:30",
      status: "Agendada",
      unitId: 2,
      unitName: "UBS da Federação",
      notes: ""
    },
    {
      id: 5,
      patientId: 2,
      professionalId: 1,
      patientName: "João Oliveira Costa",
      professionalName: "Dr. João Silva",
      specialty: "Cardiologia",
      date: "2024-10-18",
      time: "14:00",
      status: "Agendada",
      unitId: 2,
      unitName: "UBS da Federação",
      notes: ""
    },
    {
      id: 6,
      patientId: 3,
      professionalId: 1,
      patientName: "Ana Paula Ribeiro",
      professionalName: "Dr. João Silva",
      specialty: "Cardiologia",
      date: "2024-10-22",
      time: "11:00",
      status: "Agendada",
      unitId: 2,
      unitName: "UBS da Federação",
      notes: ""
    },
    {
      id: 7,
      patientId: 1,
      professionalId: 2,
      patientName: "Maria Silva Santos",
      professionalName: "Dra. Maria Oliveira",
      specialty: "Ginecologia",
      date: "2024-09-10",
      time: "14:30",
      status: "Realizada",
      unitId: 2,
      unitName: "UBS da Federação",
      notes: "Consulta preventiva realizada. Todos os exames dentro da normalidade."
    },
    {
      id: 8,
      patientId: 2,
      professionalId: 3,
      patientName: "João Oliveira Costa",
      professionalName: "Dr. Carlos Souza",
      specialty: "Pediatria",
      date: "2024-09-20",
      time: "09:30",
      status: "Cancelada",
      unitId: 3,
      unitName: "USF São Marcos",
      notes: "Paciente solicitou cancelamento por motivos pessoais."
    },
    {
      id: 9,
      patientId: 3,
      professionalId: 4,
      patientName: "Ana Paula Ribeiro",
      professionalName: "Dra. Ana Costa",
      specialty: "Geriatria",
      date: "2024-09-25",
      time: "08:00",
      status: "Realizada",
      unitId: 4,
      unitName: "UBS de Calabetão",
      notes: "Consulta geriátrica de acompanhamento. Paciente estável, medicação ajustada."
    },
    {
      id: 10,
      patientId: 1,
      professionalId: 4,
      patientName: "Maria Silva Santos",
      professionalName: "Dra. Ana Costa",
      specialty: "Geriatria",
      date: "2024-08-15",
      time: "10:00",
      status: "Cancelada",
      unitId: 4,
      unitName: "UBS de Calabetão",
      notes: "Consulta cancelada pelo sistema administrativo."
    },
    {
      id: 11,
      patientId: 2,
      professionalId: 5,
      patientName: "João Oliveira Costa",
      professionalName: "Dr. Pedro Almeida",
      specialty: "Psiquiatria",
      date: "2024-09-05",
      time: "15:30",
      status: "Realizada",
      unitId: 5,
      unitName: "USF Polêmica",
      notes: "Primeira consulta psiquiátrica. Paciente respondeu bem ao atendimento inicial."
    },
    {
      id: 12,
      patientId: 3,
      professionalId: 6,
      patientName: "Ana Paula Ribeiro",
      professionalName: "Dr. Roberto Santos",
      specialty: "Clínica Geral",
      date: "2024-10-16",
      time: "09:00",
      status: "Agendada",
      unitId: 1,
      unitName: "Centro de Saúde Dr. Eduardo R. Baia",
      notes: ""
    },
    {
      id: 13,
      patientId: 1,
      professionalId: 7,
      patientName: "Maria Silva Santos",
      professionalName: "Dra. Lucia Ferreira",
      specialty: "Dermatologia",
      date: "2024-08-20",
      time: "11:00",
      status: "Realizada",
      unitId: 2,
      unitName: "UBS da Federação",
      notes: "Avaliação dermatológica completa. Tratamento prescrito conforme necessário."
    },
    {
      id: 14,
      patientId: 2,
      professionalId: 7,
      patientName: "João Oliveira Costa",
      professionalName: "Dra. Lucia Ferreira",
      specialty: "Dermatologia",
      date: "2024-10-28",
      time: "13:00",
      status: "Agendada",
      unitId: 2,
      unitName: "UBS da Federação",
      notes: ""
    },
    {
      id: 15,
      patientId: 3,
      professionalId: 2,
      patientName: "Ana Paula Ribeiro",
      professionalName: "Dra. Maria Oliveira",
      specialty: "Ginecologia",
      date: "2024-09-12",
      time: "16:00",
      status: "Cancelada",
      unitId: 2,
      unitName: "UBS da Federação",
      notes: "Paciente não compareceu à consulta."
    },
    {
      id: 16,
      patientId: 1,
      professionalId: 6,
      patientName: "Maria Silva Santos",
      professionalName: "Dr. Roberto Santos",
      specialty: "Clínica Geral",
      date: "2024-10-30",
      time: "10:00",
      status: "Agendada",
      unitId: 1,
      unitName: "Centro de Saúde Dr. Eduardo R. Baia",
      notes: ""
    },
    {
      id: 17,
      patientId: 2,
      professionalId: 6,
      patientName: "João Oliveira Costa",
      professionalName: "Dr. Roberto Santos",
      specialty: "Clínica Geral",
      date: "2024-09-08",
      time: "08:30",
      status: "Realizada",
      unitId: 1,
      unitName: "Centro de Saúde Dr. Eduardo R. Baia",
      notes: "Consulta de rotina. Exames laboratoriais solicitados."
    },
    {
      id: 18,
      patientId: 3,
      professionalId: 5,
      patientName: "Ana Paula Ribeiro",
      professionalName: "Dr. Pedro Almeida",
      specialty: "Psiquiatria",
      date: "2024-10-24",
      time: "14:00",
      status: "Agendada",
      unitId: 5,
      unitName: "USF Polêmica",
      notes: ""
    }
  ]);

  // Usuários do sistema (incluindo admin)
  const [users] = useState([
    {
      id: 'admin',
      name: "Administrador Sistema",
      email: "admin@ubs.salvador.gov.br",
      password: "admin123",
      type: 'admin'
    }
  ]);

  // Funções de navegação
  const navigateTo = (screen) => {
    setScreenHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const previousScreen = screenHistory[screenHistory.length - 1];
      setScreenHistory(prev => prev.slice(0, -1));
      setCurrentScreen(previousScreen);
    }
  };

  const logout = () => {
    setUserType('');
    setCurrentUser(null);
    setCurrentScreen('login');
    setScreenHistory(['login']);
    setIsLocked(false);
    setShowNotifications(false);
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  // Componente de Login
  const LoginScreen = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
      // Verificar admin
      const admin = users.find(u => u.email === loginData.email && u.password === loginData.password);
      if (admin) {
        setUserType('admin');
        setCurrentUser(admin);
        setCurrentScreen('home');
        return;
      }

      // Verificar paciente
      const patient = patients.find(p => p.email === loginData.email && p.password === loginData.password);
      if (patient) {
        setUserType('patient');
        setCurrentUser(patient);
        setCurrentScreen('home');
        return;
      }

      // Verificar profissional (usando CPF como login)
      const professional = professionals.find(p => p.cpf.replace(/[.-]/g, '') === loginData.email.replace(/[.-]/g, '') && loginData.password === '123456');
      if (professional) {
        setUserType('professional');
        setCurrentUser(professional);
        setCurrentScreen('home');
        return;
      }

      alert('Email/CPF ou senha incorretos!');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">UBS Digital Salvador</h1>
            <p className="text-gray-600">Sistema de Agendamento</p>
          </div>

          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Email ou CPF"
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Entrar
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Contas de teste:</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p><strong>Admin:</strong> admin@ubs.salvador.gov.br / admin123</p>
              <p><strong>Paciente:</strong> maria@email.com / 123456</p>
              <p><strong>Profissional:</strong> 111.222.333-44 / 123456</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Componente de Tela Bloqueada
  const LockScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">App Bloqueado</h1>
        <p className="text-gray-600 mb-8">Digite sua senha para continuar</p>
        
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        />
        
        <div className="space-y-3">
          <button
            onClick={toggleLock}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Unlock className="w-5 h-5 mr-2" />
            Desbloquear
          </button>
          
          <button
            onClick={logout}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sair do App
          </button>
        </div>
      </div>
    </div>
  );

  // Tela Principal - Paciente
  const PatientHomeScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">Olá, {currentUser?.name?.split(' ')[0]}!</h1>
            <p className="text-blue-100">UBS Digital Salvador</p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleLock}
              className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition-colors"
              title="Bloquear App"
            >
              <Lock className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition-colors relative"
              title="Notificações"
            >
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
            <button 
              onClick={() => navigateTo('edit-profile')}
              className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition-colors"
              title="Editar Perfil"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button 
              onClick={logout}
              className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {consultations.filter(c => c.patientId === currentUser?.id && c.status === 'Agendada').length > 0 && (
          <div className="bg-white/10 rounded-lg p-4">
            <h2 className="font-semibold mb-2">Próxima Consulta</h2>
            {(() => {
              const nextConsultation = consultations.find(c => c.patientId === currentUser?.id && c.status === 'Agendada');
              return nextConsultation ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">{nextConsultation.professionalName}</p>
                    <p className="text-xs text-blue-100">{nextConsultation.date} às {nextConsultation.time}</p>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button 
            onClick={() => navigateTo('schedule')}
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow"
          >
            <Calendar className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Agendar</h3>
            <p className="text-sm text-gray-600">Nova consulta</p>
          </button>
          
          <button 
            onClick={() => navigateTo('consultations')}
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow"
          >
            <FileText className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Consultas</h3>
            <p className="text-sm text-gray-600">Histórico</p>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Suas Consultas Agendadas</h3>
          {consultations.filter(c => c.patientId === currentUser?.id && c.status === 'Agendada').map((consultation) => (
            <div key={consultation.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg mb-3">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Stethoscope className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{consultation.professionalName}</p>
                  <p className="text-sm text-gray-600">{consultation.specialty}</p>
                  <p className="text-xs text-gray-500">{consultation.date} - {consultation.time}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                  {consultation.status}
                </span>
                <button 
                  onClick={() => {
                    if (window.confirm('Deseja cancelar esta consulta?')) {
                      setConsultations(prev => prev.map(c => 
                        c.id === consultation.id ? {...c, status: 'Cancelada'} : c
                      ));
                      alert('Consulta cancelada com sucesso!');
                    }
                  }}
                  className="ml-2 p-1 text-red-600 hover:bg-red-100 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {consultations.filter(c => c.patientId === currentUser?.id && c.status === 'Agendada').length === 0 && (
            <p className="text-gray-500 text-center py-4">Nenhuma consulta agendada</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">UBS Próximas</h3>
          <div className="space-y-3">
            {healthUnits.slice(0, 3).map((unit) => (
              <div key={unit.id} className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">{unit.name}</p>
                  <p className="text-sm text-gray-600">{unit.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Tela Principal - Profissional
  const ProfessionalHomeScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">{currentUser?.name}</h1>
            <p className="text-green-100">{currentUser?.specialty}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-right mr-4">
              <p className="text-sm text-green-100">Hoje</p>
              <p className="font-semibold">{consultations.filter(c => c.professionalId === currentUser?.id && c.date === new Date().toISOString().split('T')[0]).length} consultas</p>
            </div>
            <button 
              onClick={toggleLock}
              className="p-2 bg-green-700 rounded-full hover:bg-green-800 transition-colors"
            >
              <Lock className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigateTo('edit-profile')}
              className="p-2 bg-green-700 rounded-full hover:bg-green-800 transition-colors"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button 
              onClick={logout}
              className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Calendar className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Agenda</h3>
            <p className="text-2xl font-bold text-blue-600">{consultations.filter(c => c.professionalId === currentUser?.id && c.status === 'Agendada').length}</p>
            <p className="text-sm text-gray-600">Agendadas</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Realizadas</h3>
            <p className="text-2xl font-bold text-green-600">{consultations.filter(c => c.professionalId === currentUser?.id && c.status === 'Realizada').length}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Próximas Consultas</h3>
          {consultations.filter(c => c.professionalId === currentUser?.id && c.status === 'Agendada').map((consultation) => (
            <div key={consultation.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg mb-3">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{consultation.patientName}</p>
                  <p className="text-sm text-gray-600">{consultation.date} - {consultation.time}</p>
                  <p className="text-xs text-gray-500">{consultation.unitName}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setConsultations(prev => prev.map(c => 
                      c.id === consultation.id ? {...c, status: 'Realizada', notes: 'Consulta realizada com sucesso'} : c
                    ));
                    alert('Consulta registrada como realizada!');
                  }}
                  className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                  title="Registrar como realizada"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    setSelectedConsultation(consultation);
                    navigateTo('consultation-detail');
                  }}
                  className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                  title="Ver detalhes"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {consultations.filter(c => c.professionalId === currentUser?.id && c.status === 'Agendada').length === 0 && (
            <p className="text-gray-500 text-center py-4">Nenhuma consulta agendada</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Horários Disponíveis Hoje</h3>
          <div className="grid grid-cols-4 gap-2">
            {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map((time, index) => (
              <div
                key={time}
                className={`p-2 text-center text-sm rounded-lg ${
                  index % 3 === 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Tela Principal - Administrador
  const AdminHomeScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">Painel Administrativo</h1>
            <p className="text-purple-100">UBS Digital Salvador</p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleLock}
              className="p-2 bg-purple-700 rounded-full hover:bg-purple-800 transition-colors"
            >
              <Lock className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigateTo('edit-profile')}
              className="p-2 bg-purple-700 rounded-full hover:bg-purple-800 transition-colors"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button 
              onClick={logout}
              className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <User className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Pacientes</h3>
            <p className="text-2xl font-bold text-blue-600">{patients.length}</p>
            <p className="text-sm text-gray-600">Cadastrados</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <UserCheck className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Profissionais</h3>
            <p className="text-2xl font-bold text-green-600">{professionals.length}</p>
            <p className="text-sm text-gray-600">Ativos</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <button 
            onClick={() => navigateTo('manage-patients')}
            className="w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left flex items-center justify-between"
          >
            <div className="flex items-center">
              <User className="w-6 h-6 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-800">Gerenciar Pacientes</h3>
                <p className="text-sm text-gray-600">Cadastrar, editar, excluir</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => navigateTo('manage-professionals')}
            className="w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left flex items-center justify-between"
          >
            <div className="flex items-center">
              <UserCheck className="w-6 h-6 text-green-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-800">Gerenciar Profissionais</h3>
                <p className="text-sm text-gray-600">Cadastrar, editar, horários</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => navigateTo('manage-units')}
            className="w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left flex items-center justify-between"
          >
            <div className="flex items-center">
              <Building2 className="w-6 h-6 text-orange-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-800">Gerenciar Unidades</h3>
                <p className="text-sm text-gray-600">Cadastrar, editar UBS</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => navigateTo('consultations')}
            className="w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left flex items-center justify-between"
          >
            <div className="flex items-center">
              <Calendar className="w-6 h-6 text-purple-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-800">Agenda Geral</h3>
                <p className="text-sm text-gray-600">Visualizar todas as consultas</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => navigateTo('schedule')}
            className="w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left flex items-center justify-between"
          >
            <div className="flex items-center">
              <Plus className="w-6 h-6 text-green-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-800">Agendar Consulta</h3>
                <p className="text-sm text-gray-600">Novo agendamento</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => navigateTo('reports')}
            className="w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left flex items-center justify-between"
          >
            <div className="flex items-center">
              <FileText className="w-6 h-6 text-indigo-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-800">Relatórios</h3>
                <p className="text-sm text-gray-600">Gerar relatórios administrativos</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Consultas Recentes</h3>
          {consultations.slice(0, 5).map((consultation) => (
            <div key={consultation.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg mb-2">
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{consultation.patientName}</p>
                <p className="text-xs text-gray-600">{consultation.professionalName} - {consultation.date}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                consultation.status === 'Agendada' ? 'bg-blue-100 text-blue-700' :
                consultation.status === 'Realizada' ? 'bg-green-100 text-green-700' :
                'bg-red-100 text-red-700'
              }`}>
                {consultation.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Tela de Agendamento
  const ScheduleScreen = () => {
    const [step, setStep] = useState(1);
    const [scheduleData, setScheduleData] = useState({
      selectedUnitId: null,
      selectedProfessionalId: null,
      selectedPatientId: userType === 'patient' ? currentUser?.id : null,
      selectedDate: '',
      selectedTime: ''
    });
    
    const [availableTimes, setAvailableTimes] = useState([]);
    
    useEffect(() => {
      if (scheduleData.selectedProfessionalId && scheduleData.selectedDate) {
        const prof = professionals.find(p => p.id === scheduleData.selectedProfessionalId);
        if (prof) {
          const [start, end] = prof.available.split('-');
          const startHour = parseInt(start.split(':')[0]);
          const endHour = parseInt(end.split(':')[0]);
          
          const times = [];
          for (let hour = startHour; hour < endHour; hour++) {
            const timeStr = `${hour.toString().padStart(2, '0')}:00`;
            const isOccupied = consultations.some(c => 
              c.professionalId === scheduleData.selectedProfessionalId && 
              c.date === scheduleData.selectedDate && 
              c.time === timeStr &&
              c.status === 'Agendada'
            );
            
            if (!isOccupied) {
              times.push(timeStr);
              if (hour + 0.5 < endHour) {
                const halfTimeStr = `${hour.toString().padStart(2, '0')}:30`;
                const isHalfOccupied = consultations.some(c => 
                  c.professionalId === scheduleData.selectedProfessionalId && 
                  c.date === scheduleData.selectedDate && 
                  c.time === halfTimeStr &&
                  c.status === 'Agendada'
                );
                if (!isHalfOccupied) {
                  times.push(halfTimeStr);
                }
              }
            }
          }
          setAvailableTimes(times);
        }
      }
    }, [scheduleData.selectedProfessionalId, scheduleData.selectedDate]);

    const handleConfirmSchedule = () => {
      // Validações
      if (userType !== 'admin' && userType !== 'patient') {
        alert('Apenas pacientes e administradores podem agendar consultas!');
        return;
      }

      const patient = patients.find(p => p.id === scheduleData.selectedPatientId);
      if (!patient?.susCard) {
        alert('Erro: Paciente deve ter Cartão SUS válido para realizar agendamentos!');
        return;
      }

      const professional = professionals.find(p => p.id === scheduleData.selectedProfessionalId);
      const unit = healthUnits.find(u => u.id === scheduleData.selectedUnitId);
      
      const newConsultation = {
        id: Math.max(...consultations.map(c => c.id)) + 1,
        patientId: scheduleData.selectedPatientId,
        professionalId: scheduleData.selectedProfessionalId,
        patientName: patient.name,
        professionalName: professional.name,
        specialty: professional.specialty,
        date: scheduleData.selectedDate,
        time: scheduleData.selectedTime,
        status: "Agendada",
        unitId: scheduleData.selectedUnitId,
        unitName: unit.name,
        notes: ""
      };

      setConsultations([...consultations, newConsultation]);
      alert('Consulta agendada com sucesso!');
      goBack();
    };

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={goBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold">Agendar Consulta</h1>
            </div>
            <div className="text-sm text-gray-500">
              Passo {step} de {userType === 'admin' ? 5 : 4}
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Step 0: Selecionar Paciente (apenas para admin) */}
          {userType === 'admin' && step === 1 && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Selecione o Paciente</h3>
                <div className="space-y-3">
                  {patients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => {
                        setScheduleData({...scheduleData, selectedPatientId: patient.id});
                        setStep(2);
                      }}
                      className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                    >
                      <div className="flex items-center">
                        <User className="w-6 h-6 text-blue-600 mr-4" />
                        <div>
                          <p className="font-medium text-gray-800">{patient.name}</p>
                          <p className="text-sm text-gray-600">CPF: {patient.cpf}</p>
                          <p className="text-sm text-gray-600">Cartão SUS: {patient.susCard}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Selecionar UBS */}
          {((userType === 'patient' && step === 1) || (userType === 'admin' && step === 2)) && (
            <div className="space-y-6">
              {userType === 'admin' && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <User className="w-4 h-4 inline mr-2" />
                    Paciente selecionado: <strong>{patients.find(p => p.id === scheduleData.selectedPatientId)?.name}</strong>
                  </p>
                </div>
              )}
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Selecione a UBS</h3>
                <div className="space-y-3">
                  {healthUnits.map((unit) => (
                    <button
                      key={unit.id}
                      onClick={() => {
                        setScheduleData({...scheduleData, selectedUnitId: unit.id});
                        setStep(userType === 'admin' ? 3 : 2);
                      }}
                      className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                    >
                      <div className="flex items-center">
                        <Building2 className="w-6 h-6 text-blue-600 mr-4" />
                        <div>
                          <p className="font-medium text-gray-800">{unit.name}</p>
                          <p className="text-sm text-gray-600">{unit.address}</p>
                          <p className="text-xs text-gray-500">Telefone: {unit.phone}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Selecionar Profissional */}
          {((userType === 'patient' && step === 2) || (userType === 'admin' && step === 3)) && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <Building2 className="w-4 h-4 inline mr-2" />
                  UBS selecionada: <strong>{healthUnits.find(u => u.id === scheduleData.selectedUnitId)?.name}</strong>
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Selecione o Profissional</h3>
                <div className="space-y-3">
                  {professionals
                    .filter(prof => prof.unitId === scheduleData.selectedUnitId)
                    .map((prof) => (
                    <button
                      key={prof.id}
                      onClick={() => {
                        setScheduleData({...scheduleData, selectedProfessionalId: prof.id});
                        setStep(userType === 'admin' ? 4 : 3);
                      }}
                      className="w-full p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <UserCheck className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{prof.name}</p>
                          <p className="text-sm text-green-600">{prof.specialty}</p>
                          <p className="text-xs text-gray-500">Disponível: {prof.available}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => setStep(userType === 'admin' ? 2 : 1)}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Voltar
              </button>
            </div>
          )}

          {/* Step 3: Selecionar Data */}
          {((userType === 'patient' && step === 3) || (userType === 'admin' && step === 4)) && (
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800 text-sm">
                  <UserCheck className="w-4 h-4 inline mr-2" />
                  Profissional: <strong>{professionals.find(p => p.id === scheduleData.selectedProfessionalId)?.name}</strong>
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Selecione a Data</h3>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={scheduleData.selectedDate}
                  onChange={(e) => {
                    setScheduleData({...scheduleData, selectedDate: e.target.value});
                    if (e.target.value) setStep(userType === 'admin' ? 5 : 4);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button 
                onClick={() => setStep(userType === 'admin' ? 3 : 2)}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Voltar
              </button>
            </div>
          )}

          {/* Step 4: Selecionar Horário */}
          {((userType === 'patient' && step === 4) || (userType === 'admin' && step === 5)) && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 text-sm mb-1">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Data: <strong>{new Date(scheduleData.selectedDate).toLocaleDateString('pt-BR')}</strong>
                </p>
                <p className="text-gray-700 text-sm">
                  <UserCheck className="w-4 h-4 inline mr-2" />
                  {professionals.find(p => p.id === scheduleData.selectedProfessionalId)?.name}
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Horários Disponíveis</h3>
                {availableTimes.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setScheduleData({...scheduleData, selectedTime: time})}
                        className={`p-3 border rounded-lg text-sm font-medium transition-all ${
                          scheduleData.selectedTime === time
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Nenhum horário disponível para esta data</p>
                    <p className="text-sm text-gray-500">Tente selecionar outra data</p>
                  </div>
                )}
              </div>

              {scheduleData.selectedTime && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-blue-800">Confirmar Agendamento</h4>
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="space-y-2 text-sm text-blue-700">
                    {userType === 'admin' && (
                      <p><strong>Paciente:</strong> {patients.find(p => p.id === scheduleData.selectedPatientId)?.name}</p>
                    )}
                    <p><strong>UBS:</strong> {healthUnits.find(u => u.id === scheduleData.selectedUnitId)?.name}</p>
                    <p><strong>Profissional:</strong> {professionals.find(p => p.id === scheduleData.selectedProfessionalId)?.name}</p>
                    <p><strong>Data:</strong> {new Date(scheduleData.selectedDate).toLocaleDateString('pt-BR')}</p>
                    <p><strong>Horário:</strong> {scheduleData.selectedTime}</p>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-4">
                <button 
                  onClick={() => setStep(userType === 'admin' ? 4 : 3)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={handleConfirmSchedule}
                  disabled={!scheduleData.selectedTime}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Confirmar Agendamento
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Tela de Consultas
  const ConsultationsScreen = () => {
    const [statusFilter, setStatusFilter] = useState('Todas');
    
    const getFilteredConsultations = () => {
      let filtered = consultations;
      
      if (userType === 'patient') {
        filtered = consultations.filter(c => c.patientId === currentUser?.id);
      } else if (userType === 'professional') {
        filtered = consultations.filter(c => c.professionalId === currentUser?.id);
      }
      
      if (statusFilter !== 'Todas') {
        filtered = filtered.filter(c => c.status === statusFilter);
      }
      
      return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={goBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold">
                {userType === 'patient' ? 'Minhas Consultas' : 
                 userType === 'professional' ? 'Minha Agenda' : 'Todas as Consultas'}
              </h1>
            </div>
            <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {['Todas', 'Agendada', 'Realizada', 'Cancelada'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {getFilteredConsultations().map((consultation) => (
              <div 
                key={consultation.id} 
                className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedConsultation(consultation);
                  navigateTo('consultation-detail');
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      consultation.status === 'Agendada' ? 'bg-blue-100' :
                      consultation.status === 'Realizada' ? 'bg-green-100' :
                      'bg-red-100'
                    }`}>
                      <Stethoscope className={`w-6 h-6 ${
                        consultation.status === 'Agendada' ? 'text-blue-600' :
                        consultation.status === 'Realizada' ? 'text-green-600' :
                        'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {userType === 'patient' ? consultation.professionalName : 
                         userType === 'professional' ? consultation.patientName : 
                         `${consultation.patientName} - ${consultation.professionalName}`}
                      </p>
                      <p className="text-sm text-gray-600">{consultation.specialty}</p>
                      <p className="text-xs text-gray-500">{consultation.unitName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      consultation.status === 'Agendada' ? 'bg-blue-100 text-blue-700' :
                      consultation.status === 'Realizada' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {consultation.status}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">{consultation.date}</p>
                    <p className="text-xs text-gray-500">{consultation.time}</p>
                  </div>
                </div>
                
                {consultation.notes && (
                  <div className="bg-gray-50 p-3 rounded-lg mt-3">
                    <p className="text-sm text-gray-700">{consultation.notes}</p>
                  </div>
                )}

                {/* Botões de ação baseados no tipo de usuário */}
                <div className="flex justify-end mt-3 space-x-2" onClick={(e) => e.stopPropagation()}>
                  {userType === 'patient' && consultation.status === 'Agendada' && (
                    <button 
                      onClick={() => {
                        if (window.confirm('Deseja cancelar esta consulta?')) {
                          setConsultations(prev => prev.map(c => 
                            c.id === consultation.id ? {...c, status: 'Cancelada'} : c
                          ));
                          alert('Consulta cancelada com sucesso!');
                        }
                      }}
                      className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200"
                    >
                      Cancelar
                    </button>
                  )}
                  
                  {userType === 'professional' && consultation.status === 'Agendada' && (
                    <button 
                      onClick={() => {
                        setConsultations(prev => prev.map(c => 
                          c.id === consultation.id ? {...c, status: 'Realizada', notes: 'Consulta realizada com sucesso'} : c
                        ));
                        alert('Consulta registrada como realizada!');
                      }}
                      className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded hover:bg-green-200"
                    >
                      Marcar Realizada
                    </button>
                  )}
                  
                  {userType === 'admin' && consultation.status === 'Agendada' && (
                    <button 
                      onClick={() => {
                        if (window.confirm('Deseja cancelar esta consulta?')) {
                          setConsultations(prev => prev.map(c => 
                            c.id === consultation.id ? {...c, status: 'Cancelada'} : c
                          ));
                          alert('Consulta cancelada com sucesso!');
                        }
                      }}
                      className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {getFilteredConsultations().length === 0 && (
              <div className="text-center py-8">
                <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Nenhuma consulta encontrada</p>
                <p className="text-sm text-gray-400">Tente ajustar os filtros</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Tela de Detalhes da Consulta
  const ConsultationDetailScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center">
          <button onClick={goBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Detalhes da Consulta</h1>
        </div>
      </div>

      {selectedConsultation && (
        <div className="p-6 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 ${
                selectedConsultation.status === 'Agendada' ? 'bg-blue-100' :
                selectedConsultation.status === 'Realizada' ? 'bg-green-100' :
                'bg-red-100'
              }`}>
                <Stethoscope className={`w-8 h-8 ${
                  selectedConsultation.status === 'Agendada' ? 'text-blue-600' :
                  selectedConsultation.status === 'Realizada' ? 'text-green-600' :
                  'text-red-600'
                }`} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{selectedConsultation.specialty}</h2>
                <p className="text-gray-600">{selectedConsultation.professionalName}</p>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  selectedConsultation.status === 'Agendada' ? 'bg-blue-100 text-blue-700' :
                  selectedConsultation.status === 'Realizada' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {selectedConsultation.status}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Data e Horário</p>
                  <p className="text-gray-600">{selectedConsultation.date} às {selectedConsultation.time}</p>
                </div>
              </div>

              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Local</p>
                  <p className="text-gray-600">{selectedConsultation.unitName}</p>
                </div>
              </div>

              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Paciente</p>
                  <p className="text-gray-600">{selectedConsultation.patientName}</p>
                </div>
              </div>

              <div className="flex items-center">
                <UserCheck className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Profissional</p>
                  <p className="text-gray-600">{selectedConsultation.professionalName}</p>
                </div>
              </div>
            </div>

            {selectedConsultation.notes && (
              <div className="bg-gray-50 p-4 rounded-lg mt-6">
                <h3 className="font-medium text-gray-800 mb-2">Observações</h3>
                <p className="text-gray-700">{selectedConsultation.notes}</p>
              </div>
            )}
          </div>

          {/* Ações baseadas no status e tipo de usuário */}
          {selectedConsultation.status === 'Agendada' && (
            <div className="space-y-3">
              {(userType === 'patient' || userType === 'admin') && (
                <button 
                  onClick={() => {
                    if (window.confirm('Deseja cancelar esta consulta?')) {
                      setConsultations(prev => prev.map(c => 
                        c.id === selectedConsultation.id ? {...c, status: 'Cancelada'} : c
                      ));
                      alert('Consulta cancelada com sucesso!');
                      goBack();
                    }
                  }}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5 mr-2" />
                  Cancelar Consulta
                </button>
              )}
              
              {userType === 'professional' && (
                <button 
                  onClick={() => {
                    const notes = prompt('Adicione observações sobre a consulta (opcional):');
                    setConsultations(prev => prev.map(c => 
                      c.id === selectedConsultation.id ? {
                        ...c, 
                        status: 'Realizada', 
                        notes: notes || 'Consulta realizada com sucesso'
                      } : c
                    ));
                    alert('Consulta registrada como realizada!');
                    goBack();
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Registrar Atendimento
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Tela de Editar Perfil
  const EditProfileScreen = () => {
    const [editData, setEditData] = useState(() => {
      if (userType === 'patient') {
        return {...currentUser};
      } else if (userType === 'professional') {
        return {...currentUser};
      } else {
        return {...currentUser};
      }
    });

    const handleSave = () => {
      if (userType === 'patient') {
        setPatients(prev => prev.map(p => 
          p.id === currentUser.id ? editData : p
        ));
        setCurrentUser(editData);
      } else if (userType === 'professional') {
        setProfessionals(prev => prev.map(p => 
          p.id === currentUser.id ? editData : p
        ));
        setCurrentUser(editData);
      }
      
      alert('Perfil atualizado com sucesso!');
      goBack();
    };

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center">
            <button onClick={goBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Editar Perfil</h1>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={editData.name || ''}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {userType === 'patient' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={editData.email || ''}
                      onChange={(e) => setEditData({...editData, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={editData.phone || ''}
                      onChange={(e) => setEditData({...editData, phone: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                    <input
                      type="text"
                      value={editData.address || ''}
                      onChange={(e) => setEditData({...editData, address: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {userType === 'professional' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Especialidade</label>
                    <input
                      type="text"
                      value={editData.specialty || ''}
                      onChange={(e) => setEditData({...editData, specialty: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Horário Disponível</label>
                    <input
                      type="text"
                      value={editData.available || ''}
                      onChange={(e) => setEditData({...editData, available: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: 08:00-16:00"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={goBack}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Tela de Gerenciar Pacientes (Admin)
  const ManagePatientsScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={goBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Gerenciar Pacientes</h1>
          </div>
          <button 
            onClick={() => navigateTo('patient-registration')}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            title="Cadastrar Novo Paciente"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar pacientes por nome ou CPF..."
            className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          {patients.map((patient) => (
            <div key={patient.id} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{patient.name}</p>
                    <p className="text-sm text-gray-600">CPF: {patient.cpf}</p>
                    <p className="text-sm text-gray-600">Cartão SUS: {patient.susCard}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Deseja excluir este paciente?')) {
                        setPatients(prev => prev.filter(p => p.id !== patient.id));
                        alert('Paciente excluído com sucesso!');
                      }
                    }}
                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {patient.phone}
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {patient.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {patient.address}
                </div>
                {patient.birthDate && (
                  <div className="text-gray-600 text-xs mt-1">
                    Nascimento: {new Date(patient.birthDate).toLocaleDateString('pt-BR')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Tela de Cadastro de Paciente
  const PatientRegistrationScreen = () => {
    const [formData, setFormData] = useState({
      name: '',
      cpf: '',
      birthDate: '',
      email: '',
      address: '',
      phone: '',
      susCard: '',
      password: '123456'
    });
    
    const [errors, setErrors] = useState({});

    const validateForm = () => {
      const newErrors = {};
      
      if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
      if (!formData.cpf.trim()) newErrors.cpf = 'CPF é obrigatório';
      if (!formData.birthDate) newErrors.birthDate = 'Data de nascimento é obrigatória';
      if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
      if (!formData.address.trim()) newErrors.address = 'Endereço é obrigatório';
      if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
      if (!formData.susCard.trim()) newErrors.susCard = 'Cartão SUS é obrigatório';
      
      // Validação de formato do CPF
      if (formData.cpf && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
        newErrors.cpf = 'CPF deve estar no formato XXX.XXX.XXX-XX';
      }
      
      // Validação de formato do Cartão SUS
      if (formData.susCard && !/^\d{3}\.\d{4}\.\d{4}\.\d{4}$/.test(formData.susCard)) {
        newErrors.susCard = 'Cartão SUS deve estar no formato XXX.XXXX.XXXX.XXXX';
      }
      
      // Verificar CPF duplicado
      if (formData.cpf && patients.some(p => p.cpf === formData.cpf)) {
        newErrors.cpf = 'CPF já cadastrado no sistema';
      }
      
      // Verificar Cartão SUS duplicado
      if (formData.susCard && patients.some(p => p.susCard === formData.susCard)) {
        newErrors.susCard = 'Cartão SUS já cadastrado no sistema';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
      if (validateForm()) {
        const newPatient = {
          id: Math.max(...patients.map(p => p.id)) + 1,
          ...formData
        };
        setPatients([...patients, newPatient]);
        alert('Paciente cadastrado com sucesso!');
        goBack();
      }
    };

    const formatCPF = (value) => {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    };

    const formatSusCard = (value) => {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{4})(\d)/, '$1.$2')
        .replace(/(\d{4})(\d)/, '$1.$2')
        .replace(/(\d{4})\d+?$/, '$1');
    };

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center">
            <button onClick={goBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Cadastrar Paciente</h1>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Digite o nome completo"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CPF *</label>
                <input
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => setFormData({...formData, cpf: formatCPF(e.target.value)})}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.cpf ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="000.000.000-00"
                  maxLength={14}
                />
                {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento *</label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.birthDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="exemplo@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Endereço Completo *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Rua, número, bairro, cidade"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone de Contato *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="(71) 99999-9999"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <label className="block text-sm font-medium text-blue-800 mb-2">
                  Número do Cartão SUS * 
                  <span className="text-blue-600 text-xs">(Obrigatório)</span>
                </label>
                <input
                  type="text"
                  value={formData.susCard}
                  onChange={(e) => setFormData({...formData, susCard: formatSusCard(e.target.value)})}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                    errors.susCard ? 'border-red-500' : 'border-blue-300'
                  }`}
                  placeholder="000.0000.0000.0000"
                  maxLength={19}
                />
                {errors.susCard && <p className="text-red-500 text-xs mt-1">{errors.susCard}</p>}
                <p className="text-blue-600 text-xs mt-1">
                  O Cartão SUS é necessário para realizar agendamentos
                </p>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={goBack}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Tela de Gerenciar Profissionais (Admin)
  const ManageProfessionalsScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={goBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Gerenciar Profissionais</h1>
          </div>
          <button 
            onClick={() => navigateTo('professional-registration')}
            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            title="Cadastrar Novo Profissional"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar profissionais por nome, especialidade ou CPF..."
            className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="space-y-4">
          {professionals.map((professional) => (
            <div key={professional.id} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{professional.name}</p>
                    <p className="text-sm text-green-600">{professional.specialty}</p>
                    <p className="text-sm text-gray-600">{professional.registration}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Deseja excluir este profissional?')) {
                        setProfessionals(prev => prev.filter(p => p.id !== professional.id));
                        alert('Profissional excluído com sucesso!');
                      }
                    }}
                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Disponível: {professional.available}
                </div>
                <div className="flex items-center text-gray-600">
                  <Building2 className="w-4 h-4 mr-2" />
                  {professional.unitName}
                </div>
                <div className="text-gray-600 text-xs">
                  CPF: {professional.cpf}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Tela de Relatórios (Admin)
  const ReportsScreen = () => {
    const [reportType, setReportType] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [reportData, setReportData] = useState([]);

    const generateReport = () => {
      let data = [];
      
      switch(reportType) {
        case 'consultations-period':
          data = consultations.filter(c => {
            if (!dateRange.start || !dateRange.end) return true;
            const consultDate = new Date(c.date);
            const startDate = new Date(dateRange.start);
            const endDate = new Date(dateRange.end);
            return consultDate >= startDate && consultDate <= endDate;
          });
          break;
        case 'consultations-patient':
          data = consultations.map(c => ({
            ...c,
            patientInfo: patients.find(p => p.id === c.patientId)
          }));
          break;
        case 'consultations-professional':
          data = consultations.map(c => ({
            ...c,
            professionalInfo: professionals.find(p => p.id === c.professionalId)
          }));
          break;
        default:
          data = consultations;
      }
      
      setReportData(data);
    };

    const exportToPDF = () => {
      alert('Funcionalidade de exportação PDF será implementada');
    };

    const exportToCSV = () => {
      const csvContent = reportData.map(item => 
        `${item.patientName},${item.professionalName},${item.specialty},${item.date},${item.time},${item.status}`
      ).join('\n');
      
      const blob = new Blob([`Paciente,Profissional,Especialidade,Data,Horário,Status\n${csvContent}`], 
        { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'relatorio-consultas.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    };

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center">
            <button onClick={goBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Relatórios</h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Tipo de Relatório</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reportType"
                  value="consultations-period"
                  checked={reportType === 'consultations-period'}
                  onChange={(e) => setReportType(e.target.value)}
                  className="mr-3"
                />
                <span>Consultas por Período</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reportType"
                  value="consultations-patient"
                  checked={reportType === 'consultations-patient'}
                  onChange={(e) => setReportType(e.target.value)}
                  className="mr-3"
                />
                <span>Consultas por Paciente</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reportType"
                  value="consultations-professional"
                  checked={reportType === 'consultations-professional'}
                  onChange={(e) => setReportType(e.target.value)}
                  className="mr-3"
                />
                <span>Consultas por Profissional</span>
              </label>
            </div>
          </div>

          {reportType === 'consultations-period' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Período</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Início
                  </label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Fim
                  </label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            onClick={generateReport}
            disabled={!reportType}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-300"
          >
            Gerar Relatório
          </button>

          {reportData.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Resultados ({reportData.length})</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={exportToPDF}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    PDF
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    CSV
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {reportData.map((item, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">{item.patientName}</p>
                        <p className="text-sm text-gray-600">{item.professionalName} - {item.specialty}</p>
                        <p className="text-xs text-gray-500">{item.date} às {item.time}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.status === 'Agendada' ? 'bg-blue-100 text-blue-700' :
                        item.status === 'Realizada' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Navegação Bottom
  const BottomNavigation = () => {
    const getNavItems = () => {
      switch(userType) {
        case 'patient':
          return [
            { icon: Home, label: 'Início', screen: 'home', active: currentScreen === 'home' },
            { icon: Calendar, label: 'Agendar', screen: 'schedule', active: currentScreen === 'schedule' },
            { icon: FileText, label: 'Consultas', screen: 'consultations', active: currentScreen === 'consultations' },
            { icon: User, label: 'Perfil', screen: 'edit-profile', active: currentScreen === 'edit-profile' }
          ];
        case 'professional':
          return [
            { icon: Home, label: 'Início', screen: 'home', active: currentScreen === 'home' },
            { icon: Calendar, label: 'Agenda', screen: 'consultations', active: currentScreen === 'consultations' },
            { icon: CheckCircle, label: 'Atender', screen: 'consultations', active: false },
            { icon: User, label: 'Perfil', screen: 'edit-profile', active: currentScreen === 'edit-profile' }
          ];
        case 'admin':
          return [
            { icon: Home, label: 'Início', screen: 'home', active: currentScreen === 'home' },
            { icon: User, label: 'Pacientes', screen: 'manage-patients', active: currentScreen === 'manage-patients' },
            { icon: UserCheck, label: 'Médicos', screen: 'manage-professionals', active: currentScreen === 'manage-professionals' },
            { icon: FileText, label: 'Relatórios', screen: 'reports', active: currentScreen === 'reports' }
          ];
        default:
          return [];
      }
    };

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around max-w-md mx-auto">
          {getNavItems().map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setScreenHistory(['login']);
                setCurrentScreen(item.screen);
              }}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                item.active ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Renderização principal
  const renderScreen = () => {
    if (isLocked) return <LockScreen />;
    if (currentScreen === 'login') return <LoginScreen />;
    
    switch(currentScreen) {
      case 'home':
        switch(userType) {
          case 'patient': return <PatientHomeScreen />;
          case 'professional': return <ProfessionalHomeScreen />;
          case 'admin': return <AdminHomeScreen />;
          default: return <LoginScreen />;
        }
      case 'schedule':
        return <ScheduleScreen />;
      case 'consultations':
        return <ConsultationsScreen />;
      case 'consultation-detail':
        return <ConsultationDetailScreen />;
      case 'edit-profile':
        return <EditProfileScreen />;
      case 'manage-patients':
        return userType === 'admin' ? <ManagePatientsScreen /> : <LoginScreen />;
      case 'patient-registration':
        return userType === 'admin' ? <PatientRegistrationScreen /> : <LoginScreen />;
      case 'manage-professionals':
        return userType === 'admin' ? <ManageProfessionalsScreen /> : <LoginScreen />;
      case 'reports':
        return userType === 'admin' ? <ReportsScreen /> : <LoginScreen />;
      default:
        return <LoginScreen />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
      {renderScreen()}
      {currentScreen !== 'login' && !isLocked && <BottomNavigation />}
    </div>
  );
};

export default UBSSalvadorSystem;

              