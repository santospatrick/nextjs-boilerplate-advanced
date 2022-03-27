import { Container } from '@chakra-ui/react'
import HomeTable from '@/components/tables/HomeTable'

function Index() {
  return (
    <Container maxW='container.xl'>
      There are many benefits to a joint design and development system. Not only
      does it bring benefits to the design team, but it also brings benefits to
      engineering teams. It makes sure that our experiences have a consistent look
      and feel, not just in our design specs, but in production
      <HomeTable />
    </Container>
  )
}

export default Index